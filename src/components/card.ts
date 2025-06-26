import { IProduct, IActionEvent } from '../types';
import { ensureElement, bem } from '../utils/utils';
import { Component } from './base/abstract';

export class Card<T extends IProduct | {}> extends Component<T | IProduct> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _description?: HTMLElement;
	protected _buttonModal?: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		act?: IActionEvent
	) {
		super(container);

		const getElement = (selector: string) =>
			ensureElement<HTMLElement>(selector, container);

		this._title = getElement(`.${blockName}__title`);
		this._image = container.querySelector(`.${blockName}__image`);
		this._price = getElement(`.${blockName}__price`);
		this._category = container.querySelector(`.${blockName}__category`);
		this._buttonModal = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__text`);

		if (act?.onClick) {
			if (this._buttonModal) {
				this._buttonModal.textContent = 'Купить';
				this._buttonModal.addEventListener('click', act.onClick);
			} else {
				container.addEventListener('click', act.onClick);
			}
		}
	}

	public nextStep(value: boolean) {
		return value
			? this.setText(this._buttonModal, 'В корзину')
			: this.setText(this._buttonModal, 'Купить');
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}
	get id() {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}
	get title() {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this._image.setAttribute('src', value);
	}

	set price(value: number) {
		if (value === null || isNaN(value)) {
			this.setText(this._price, 'Бесценно');
			this.setDisabled(this._buttonModal, true);
		} else {
			this.setText(this._price, value + ' синапс');
			if (value !== 1) {
				this._price.textContent += 'ов';
			}
			this.setDisabled(this._buttonModal, false);
		}
	}

	set category(value: string) {
		const keys: Record<string, string> = {
			'софт-скил': 'soft',
			'хард-скил': 'hard',
			кнопка: 'button',
			другое: 'other',
			дополнительное: 'additional',
		};
		const selector = bem(this.blockName, 'category', keys[value]).name;
		this.setText(this._category, value);
		this.toggleClass(this._category, selector, true);
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description
				?.querySelectorAll('.description-item')
				.forEach((element: HTMLElement, index: number) => {
					this.setText(element, value[index]);
				});
		} else {
			this.setText(this._description, value);
		}
	}
}