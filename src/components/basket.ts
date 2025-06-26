import { IBasket, IAction } from '../types';
import { ensureElement, createElement } from '../utils/utils';
import { Component } from './base/abstract';
import { EventEmitter } from './base/events';
import { Card } from './card';
import { elements } from '../utils/constants';

export class Basket extends Component<IBasket> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		const getElement = (selector: string) => ensureElement<HTMLElement>(selector, this.container);

		this._list = getElement(elements.basket.list);
		this._total = getElement(elements.basket.total);
		this._button = getElement(elements.basket.button);


		this._button.addEventListener('click', () => {
			events.emit('order:open');
		});

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: `Корзина пуста`,
				})
			);
		}
	}

	get items(): HTMLElement[] {
		if (this._list.childElementCount === 0) {
			return [
				createElement<HTMLParagraphElement>('p', {
					textContent: `Корзина пуста`,
				}),
			];
		}
		return Array.from(this._list.children) as HTMLElement[];
	}

	set selected(items: string[]) {
		if (items.length) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	set total(total: number) {
		this.setText(this._total, total + ' синапсов');
	}
}

export type IBasketIndex = {
	index: number;
};

export class BasketItem extends Card<IBasketIndex> {
	protected _index: HTMLElement;
	protected _btn: HTMLButtonElement;
	constructor(container: HTMLElement, act?: IAction) {
		super('card', container);

		this._index = ensureElement<HTMLElement>(elements.basket.itemIndex, container);
		this._btn = ensureElement<HTMLButtonElement>(elements.basket.itemDelete, container);
		this._btn.addEventListener('click', act.onClick);
	}
	set index(value: number) {
		this.setText(this._index, value);
	}
}