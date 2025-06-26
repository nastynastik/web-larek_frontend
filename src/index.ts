import './scss/styles.scss';

import { State } from './components/state';
import { EventEmitter } from './components/base/events';
import { Basket, BasketItem } from './components/basket';
import { Card } from './components/card';
import { Order, Contact } from './components/order';
import { Page } from './components/page';
import { PopupComponent } from './components/popup';
import { ProductAPI } from './components/productAPI';
import { IProduct, IOrderForm } from './types';
import { CDN_URL, API_URL, settings } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { handleSuccess, apiCache } from './components/cacheAPI';

const api = new ProductAPI(CDN_URL, API_URL);
const events = new EventEmitter();

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>(
	`#${settings.cardCatalogTmp}`
);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>(
	`#${settings.cardPreviewTmp}`
);
const basketTemplate = ensureElement<HTMLTemplateElement>(
	`#${settings.basketTmp}`
);
const basketCardTemplate = ensureElement<HTMLTemplateElement>(
	`#${settings.cardBasketTmp}`
);
const orderTemplate = ensureElement<HTMLTemplateElement>(
	`#${settings.orderTmp}`
);
const contactsTemplate = ensureElement<HTMLTemplateElement>(
	`#${settings.contactsTmp}`
);
const popupTemplate = ensureElement<HTMLTemplateElement>(
	`#${settings.modalContainerTmp}`
);
export const successTemplate = ensureElement<HTMLTemplateElement>(
	`#${settings.successTmp}`
);

const state = new State({}, events);
const page = new Page(document.body, events);

export const popup = new PopupComponent(popupTemplate, events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contact = new Contact(cloneTemplate(contactsTemplate), events);

events.on('basket:open', () => {
	popup.render({
		content: basket.render(),
	});
});

events.on('items:changed', () => {
	page.catalogue = state.catalogue.map((item) => {
		const card = new Card(`card`, cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit('card:select', item);
			},
		});
		return card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

events.on('basket:changed', () => {
	basket.items = state.getCards().map((item, i) => {
		const card = new BasketItem(cloneTemplate(basketCardTemplate), {
			onClick: () => {
				state.toggleOrderItem(item.id, false);
				page.counter = state.order.items.length;
				basket.items = basket.items.filter((i) => i.dataset.id !== item.id);
				basket.total = state.total();
				basket.selected = state.order.items;
			},
		});
		return card.render({
			id: item.id,
			title: item.title,
			price: item.price,
			index: i + 1,
		});
	});
	page.counter = state.order.items.length;
	basket.total = state.total();
	basket.selected = state.order.items;
});

events.on('card:select', (item: IProduct) => {
	if (item) {
		api
			.getProductItem(item.id)
			.then((res) => {
				const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
					onClick: (evt) => {
						const btn = evt.target as HTMLButtonElement;
						if (btn.textContent === 'Купить') {
							btn.textContent = 'В корзину';
							state.toggleOrderItem(res.id, true);
							page.counter = state.order.items.length;
							events.emit('basket:changed');
						} else if (btn.textContent === 'В корзину') {
							events.emit('basket:open', item);
						}
					},
				});

				card.nextStep(state.order.items.includes(res.id));

				popup.render({
					content: card.render({
						title: res.title,
						image: res.image,
						description: res.description,
						price: res.price,
						category: res.category,
					}),
				});
			})
			.catch((err) => {
				console.error(`Error: ` + err);
			});
	} else {
		popup.close();
	}
});

events.on('order:open', () => {
	const validation = state.isFilledFieldsOrder();
	order.valid = validation;
	order.errors = validation ? '' : 'Не заполнены обязательные поля';
	popup.render({
		content: order.render({
			address: state.order.address,
			validation: state.isFilledFieldsOrder(),
			errors: [],
		}),
	});
});

events.on('contacts:open', () => {
	const validation = state.isFilledFieldsContacts();
	contact.valid = validation;
	contact.errors = validation ? '' : 'Не заполнены обязательные поля';
	popup.render({
		content: contact.render({
			email: state.order.email,
			phone: state.order.phone,
			validation: state.isFilledFieldsContacts(),
			errors: [],
		}),
	});
});

events.on('formOrderErrors:change', (errors: Partial<IOrderForm>) => {
	const { address, payment } = errors;
	order.valid = !address && !payment;
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
});

events.on('formContactsErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	contact.valid = !email && !phone;
	contact.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

events.on('order:submit', () => {
	api
		.orderProduct(state.order)
		.then((res) => {
			state.clearBasket();
			handleSuccess(res);
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on(
	'order:change',
	(data: { field: keyof IOrderForm; value: string }) => {
		state.setField(data.field, data.value);
	}
);

api
	.getProductList()
	.then(state.setCatalogue.bind(state))
	.catch((err) => {
		console.error(err);
	});