export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	cardCatalogTmp: 'card-catalog',
	cardPreviewTmp: 'card-preview',
	cardBasketTmp: 'card-basket',
	basketTmp: 'basket',
	orderTmp: 'order',
	contactsTmp: 'contacts',
	successTmp: 'success',
	modalTmp: 'modal',
	modalContainerTmp: 'modal-container',
};

export const elements = {
	page: {
		counter: '.header__basket-counter',
		gallery: '.gallery',
		wrapper: '.page__wrapper',
		basket: '.header__basket',
	},
	basket: {
		list: '.basket__list',
		total: '.basket__price',
		button: '.basket__button',
		itemIndex: '.basket__item-index',
		itemDelete: '.basket__item-delete',
	},
	card: {
		image: '.card__image',
		title: '.card__title',
		category: '.card__category',
		price: '.card__price',
	},
	popup: {
		error: '.form__errors',
		closeBtn: '.modal__close',
		cont: '.modal__content',
	},
};