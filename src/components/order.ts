import { IOrderForm, IOrdersForm, ISuccess, IAction} from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/abstract";
import { IEvents } from "./base/events";
import { Form } from "./popup";

export class Order extends Form<IOrderForm> {
  protected _submit: HTMLButtonElement;
  protected _btn: HTMLButtonElement;
  protected _btnCard: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);

    this._btn = container.querySelector('[name=cash]');

    this._btnCard = container.querySelector('[name=card]');

    if (this._btn) {
        this._btn.addEventListener('click', () => {
            console.log('Button clicked - offline');
            this.onPaymentChange('offline');
            this._btn.classList.add('button_alt-active');
            if (this._btnCard) {
                this._btnCard.classList.remove('button_alt-active');
            }
        });
    }

    if (this._btnCard) {
        this._btnCard.addEventListener('click', () => {
            console.log('Button clicked - online');
            this.onPaymentChange('online');
            this._btnCard.classList.add('button_alt-active');
            if (this._btn) {
                this._btn.classList.remove('button_alt-active');
            }
        });
    }

    this.container.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      console.log("button")
      this.events.emit('contacts:open');
    })
  }

  set valid(value: boolean) {
    this._submit.disabled = !value;
  }

  set address(value: string) { (this.container.elements.namedItem('address') as HTMLInputElement).value = value; }
}

export class Contact extends Form<IOrdersForm> {
  protected _submit: HTMLButtonElement;
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
    this.container.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      this.events.emit('order:submit');
    })
  }
  set valid(value: boolean) { this._submit.disabled = !value; };                                                  
  set phone(value: string) { ( this.container.elements.namedItem('phone') as HTMLInputElement).value = value; };  
  set email(value: string) { ( this.container.elements.namedItem('email') as HTMLInputElement).value = value; };  
}


export class Success extends Component<ISuccess> {
  protected _close: HTMLElement;
  protected _total: HTMLElement;
  constructor(container: HTMLElement, action?: IAction) {
    super(container);
    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
    this._close = ensureElement<HTMLElement>('.button', this.container);
    this._close.addEventListener('click', action.onClick); 
  }
  
  set total(total: number) {
    const currencyText = total === 1 ? 'синапс' : 'синапсов';
    this.setText(this._total, `Списано ${total} ${currencyText}`); 
  }

}