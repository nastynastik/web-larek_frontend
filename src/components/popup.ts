import { IState } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/abstract';
import { IEvents } from './base/events';
import { elements } from '../utils/constants';

export interface PopupComponentData {
	content: HTMLElement;
}

export class PopupComponent extends Component<PopupComponentData> {
	protected _closeBtn: HTMLButtonElement; 
  protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
    this._closeBtn = ensureElement<HTMLButtonElement> (elements.popup.closeBtn, this.container);
    this._content = ensureElement<HTMLElement> (elements.popup.cont, this.container);
		this._closeBtn.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}




	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: PopupComponentData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}

export class Form<T> extends Component<IState> {
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);
		this._errors = ensureElement<HTMLElement>(
			elements.popup.error,
			this.container
		);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`order:change`, { field, value });
	}

	protected onPaymentChange(value: string) {
		console.log('Payment method changed:', value);
		this.events.emit(`order:change`, { field: 'payment', value });
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IState) {
		const { validation, errors, ...inputs } = state;
		super.render({ validation, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}