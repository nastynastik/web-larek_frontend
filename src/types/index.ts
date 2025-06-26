export interface IPage {
    counter: number;
    catalogue: HTMLElement[];
    locked: boolean;
  }
  
  export interface IProducts {
    items: IProduct[];
  }
  
  export interface ISuccess {
    total: number;
  }
  
  export interface IProduct {
    description?: string;
    id: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
  }

  export interface IOrder extends IContact {
    total: number;
    items: string[];
    payment: string;
    address: string;
  }
  
  export interface IOrderForm extends ContactsError, OrderError{}
  
  export interface IOrderResult {
    id: string;
    total: number;
  }
  
  export interface IContact {
    email: string;
    phone: string;
  }
  
  export interface IBasket {
    items: HTMLElement[];
    total: number;
    selected: string[];
  }
  
  
  export interface IAction {
    onClick: () => void;
  }
  
  
  export interface IActionEvent {
    onClick: (evt: MouseEvent) => void;
  }
  
  
  export type OrderError = {
    address?: string;
    payment?: string;
  };
  
  export type ContactsError = {
    email?: string;
    phone?: string;
  };
  
  export interface IOrdersForm extends IState {
    items: string[];
    total: number;
    address: string;
    payment: string;
    email: string;
    phone: string;
  }
  
  export interface IState {
    validation: boolean;
    errors: string[];
  }
