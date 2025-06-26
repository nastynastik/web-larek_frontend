const renderSuccessScreen = () => {
	const container = document.getElementById('modal-container')!;
	container.innerHTML = `
        <div class="order-success">
            <h2 class="order-success__title">Заказ оформлен</h2>
            <p class="order-success__description">Списано 0 синапсов</p>
            <button class="button order-success__close">За новыми покупками!</button>
        </div>
    `;
};

const renderCardCatalog = () => {
	const gallery = document.querySelector('.gallery')!;
	gallery.innerHTML += `
        <button class="gallery__item card">
            <span class="card__category card__category_soft">софт-скил</span>
            <h2 class="card__title">+1 час в сутках</h2>
            <img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
            <span class="card__price">750 синапсов</span>
        </button>
    `;
};
const renderCardPreview = () => {
	const modalContent = document.querySelector('.modal__content')!;
	modalContent.innerHTML = `
        <div class="card card_full">
            <img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
            <div class="card__column">
                <span class="card__category card__category_other">другое</span>
                <h2 class="card__title">Бэкенд-антистресс</h2>
                <p class="card__text">Если планируете решать задачи в тренажёре, берите два.</p>
                <div class="card__row">
                    <button class="button card__button">В корзину</button>
                    <span class="card__price">1000 синапсов</span>
                </div>
            </div>
        </div>
    `;
};

const renderCardBasket = () => {
	const basketList = document.querySelector('.basket__list')!;
	basketList.innerHTML += `
        <li class="basket__item card card_compact">
            <span class="basket__item-index">1</span>
            <span class="card__title">Фреймворк куки судьбы</span>
            <span class="card__price">2500 синапсов</span>
            <button class="basket__item-delete card__button" aria-label="удалить"></button>
        </li>
    `;
};

const renderBasketScreen = () => {
	const modalContent = document.querySelector('.modal__content')!;
	modalContent.innerHTML = `
        <div class="basket">
            <h2 class="modal__title">Корзина</h2>
            <ul class="basket__list"></ul>
            <div class="modal__actions">
                <button class="button basket__button">Оформить</button>
                <span class="basket__price">0 синапсов</span>
            </div>
        </div>
    `;
};

const renderOrderScreen = () => {
	const modalContent = document.querySelector('.modal__content')!;
	modalContent.innerHTML = `
        <form class="form" name="order">
            <div class="order">
                <div class="order__field">
                    <h2 class="modal__title">Способ оплаты</h2>
                    <div class="order__buttons">
                        <button name="card" type="button" class="button button_alt">Онлайн</button>
                        <button name="cash" type="button" class="button button_alt">При получении</button>
                    </div>
                </div>
                <label class="order__field">
                    <span class="form__label modal__title">Адрес доставки</span>
                    <input name="address" class="form__input" type="text" placeholder="Введите адрес" />
                </label>
            </div>
            <div class="modal__actions">
                <button type="submit" disabled class="button order__button">Далее</button>
                <span class="form__errors"></span>
            </div>
        </form>
    `;
};