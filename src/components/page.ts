import { IPage } from "../types";
import { elements } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/abstract";
import { IEvents } from "./base/events";


export class Page extends Component<IPage> {
  protected _counter: HTMLElement;
  protected _catalogue: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    const getElement = (selector: string) => ensureElement<HTMLElement>(selector, this.container);

    this._counter = getElement(elements.page.counter);
    this._catalogue = getElement(elements.page.gallery);
    this._wrapper = getElement(elements.page.wrapper);
    this._basket = getElement(elements.page.basket);

    this._basket.addEventListener('click', () => this.events.emit('basket:open'));
  }

  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  set catalogue(items: HTMLElement[]) {
    this._catalogue.replaceChildren(...items);
  }

  set locked(value: boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
  }
}