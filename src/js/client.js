import './../css/client.css';
import ExcursionsAPI from './ExcursionsAPI';
import RenderExcursion from './RenderExcursion';
import CleanForm from './CleanForm';
import Render from './Render';

document.addEventListener('DOMContentLoaded', init);
const excursions = new ExcursionsAPI();
const render = new Render();
const renderExcursions = new RenderExcursion();
const excursionElement = document.querySelector('.excursions');
const basket = document.querySelector('.summary');

function init() {
    render.loadExcursions();
    cleanBasket(basket);
    addToBasket();
    if (excursions) {
        excursions
            .downloadOrders()
            .then(data => renderBasket(basket, data))
            .catch(error => console.error(error));
    };
    deleteBasketElement();
};

const addToBasket = () => {
    excursionElement.addEventListener(
        'click',
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target.parentElement.parentElement;
            const submitButton = target.querySelector('.excursions__field-input--submit');
            const form = new CleanForm();
            if (e.target === submitButton) {
                const adultsNumber = target.querySelector('input[name="adults"]');
                const childrenNumber = target.querySelector('input[name="children"]');
                const adultsPrice = adultsNumber.parentElement.querySelector('strong').innerText;
                const childrenPrice = childrenNumber.parentElement.querySelector('strong').innerText;
                const title = target.parentElement.querySelector('.excursions__title').innerText;
                const totalPrice = Number(childrenPrice) * childrenNumber.value + Number(adultsPrice) * adultsNumber.value;
                excursions
                    .addExcursionToBasket(title, adultsPrice, childrenPrice, adultsNumber.value, childrenNumber.value, totalPrice)
                    .then(form.cleanForm(target, adultsNumber, childrenNumber))
                    .then(() => {
                        cleanBasket(basket);
                        excursions
                            .downloadOrders()
                            .then(data => renderBasket(basket, data))
                    })
                    .catch(error => console.error(error));
            };
        }
    );
};

function renderBasket(container, orders) {
    if (orders) {
        let totalBasketPrice = 0;
        orders.forEach(order => {
            const basketItemPrototype = document.querySelector('.summary__item--prototype');
            const basketItem = renderExcursions.clonePrototype(basketItemPrototype, 'summary');
            const basketItemName = basketItem.querySelector('.summary__name');
            const basketItemSummaryPrices = basketItem.querySelector('.summary__prices');
            const basketItemSummaryTotalPrice = basketItem.querySelector('.summary__total-price');
            const basketTotalPrice = document.querySelector('.order__total-price-value');

            basketItem.dataset.id = order.id;
            basketItemName.innerText = order.title;
            basketItemSummaryPrices.innerText = `dorośli: ${order.numberOfAdults} x ${order.priceForAdult} PLN, dzieci: ${order.numberOfChildren} x ${order.priceForChild} PLN`;
            totalBasketPrice = totalBasketPrice + Number(order.totalPrice);
            basketItemSummaryTotalPrice.innerText = `${order.totalPrice} PLN`;
            basketTotalPrice.innerText = `${totalBasketPrice} PLN`;
            container.appendChild(basketItem);
        });
    };
};

function cleanBasket(basket) {
    if (basket.children.length > 1) {
        if (basket.lastChild) {
            while (basket.lastChild && basket.lastChild.className != 'summary__item summary__item--prototype') {
                basket.removeChild(basket.lastChild);
                const basketTotalPrice = document.querySelector('.order__total-price-value');
                basketTotalPrice.innerText = `0 PLN`;
            };
        };
    };
};

function deleteBasketElement() {
    basket.addEventListener(
        'click',
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target.parentElement.parentElement;
            const deleteButton = target.querySelector('.summary__btn-remove');
            if (e.target === deleteButton) {
                const targetId = target.dataset.id;
                excursions.handleSubmitOrders(excursions.deleteElement, targetId)
                    .then(() => {
                        cleanBasket(basket);
                        excursions
                            .downloadOrders()
                            .then(data => renderBasket(basket, data))
                    })
                    .catch(error => console.error(error));
            };
        }
    );
};