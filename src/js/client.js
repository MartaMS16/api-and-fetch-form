import './../css/client.css';
import './../css/client_tablet.css';
import './../css/client_mobile.css';
import ExcursionsAPI from './ExcursionsAPI';
import Render from './Render';
import Validation from './Validation';
import RenderExcursion from './RenderExcursion';

const excursionsAPI = new ExcursionsAPI();
const render = new Render();
const validation = new Validation();
const renderExcursions = new RenderExcursion();
const date = new Date();
const excursionElement = document.querySelector('.excursions');
const orderPanel = document.querySelector('.panel__order ');

document.addEventListener('DOMContentLoaded', init);

function init() {
    render.loadExcursions();
    validation.renderErrorMessages(orderPanel);
    deleteBasketElement();
    addToBasket();
    order();
};

function sendOrder() {
    const basket = document.querySelector('.summary');
    if (basket) {
        const customerName = document.querySelector('input[name="name"]').value;
        const customerEmail = document.querySelector('input[name="email"]').value;
        const dateOfOrder = date.toLocaleDateString();
        const timeOfOrder = date.toLocaleTimeString();
        const basketContent = Array.from(basket.children);
        const orders = [];

        excursionsAPI
            .addOrder(customerName, customerEmail, dateOfOrder, timeOfOrder)
            .then((data) => {
                basketContent.forEach(function (item) {
                    if (item.className !== 'summary__item summary__item--prototype') {
                        const orderTitle = item.querySelector('.summary__name').innerText;
                        const orderTotalPrice = item.querySelector('.summary__total-price').innerText;
                        const orderDetails = item.querySelector('.summary__prices').innerText;
                        const order = {
                            orderTitle: orderTitle,
                            orderTotalPrice: orderTotalPrice,
                            orderDetails: orderDetails
                        };
                        orders.push(order);
                    };
                    excursionsAPI
                        .addExcursionToOrders(orders, data.id)
                        .catch(error => console.error(error));
                });
            })
            .then(cleanBasket(basket))
            .catch(error => console.error(error));
    };
};

function renderBasket(container) {
    const basket = document.querySelector('.summary');
    const basketItemPrototype = document.querySelector('.summary__item--prototype');
    const basketItem =  renderExcursions.clonePrototype(basketItemPrototype, 'summary');
    const basketItemName = basketItem.querySelector('.summary__name');
    const basketItemSummaryTotalPrice = basketItem.querySelector('.summary__total-price');
    const basketItemSummaryPrices = basketItem.querySelector('.summary__prices');
    let numberOfAdults = container.querySelector('input[name=adults]').value;
    let numberOfChildren = container.querySelector('input[name=children]').value;
    const priceForAdults = container.firstElementChild.firstElementChild.firstElementChild.innerText;
    const priceForChildren = container.children.previousElementSibling.innerText;
    const totalPriceForAdults = numberOfAdults * priceForAdults;
    const totalPriceForChildren = numberOfChildren * priceForChildren;
    const totalPrice = totalPriceForAdults + totalPriceForChildren;
    
    if (numberOfAdults === '') { numberOfAdults = 0 };
    if (numberOfChildren === '') { numberOfChildren = 0 };
    
    basketItem.setAttribute('id', Math.floor(Math.random() * 1001));
    basketItemName.innerText = container.previousElementSibling.firstElementChild.innerText;
    basketItemSummaryTotalPrice.innerText = `${totalPrice} PLN`;
    basketItemSummaryPrices.innerText = `doro??li: ${numberOfAdults} x ${priceForAdults} PLN, dzieci: ${numberOfChildren} x ${priceForChildren} PLN`;

    basket.appendChild(basketItem);
};

function renderTotalBasketPrice() {
    const totalPriceItem = document.querySelector('.order__total-price-value');
    const excursionsPrices = document.querySelectorAll('.summary__total-price');
    const prices = [];
    let totalBasketPrice = 0;
    excursionsPrices.forEach(function (el) {
        if (el.parentElement.parentElement.className != 'summary__item summary__item--prototype') {
            const price = Number(el.innerText.slice(0, -4));
            prices.push(price);
        };
    });

    for (let i = 0; i < prices.length; i++) {
        totalBasketPrice += prices[i];
    };

    totalPriceItem.innerText = `${totalBasketPrice} PLN`;
};

function addToBasket() {
    excursionElement.addEventListener(
        'submit',
        function (e) {
            e.preventDefault();
            const target = e.target;
            const errors = target.querySelector('.errors');
            validation.clearErrorMessages(errors);
            validation.validateNumbersOfParticipants(target);
            if (errors.children.length === 0) {
                renderBasket(target);
                renderTotalBasketPrice();
                clearExcursionForm(target);
            };
        }
    );
};

function clearExcursionForm(excursion) {
    excursion.querySelector('input[name=adults]').value = '';
    excursion.querySelector('input[name=children]').value = '';
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
    const basket = document.querySelector('.summary');
    basket.addEventListener(
        'click',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target.parentElement.parentElement;
            const deleteButton = target.querySelector('.summary__btn-remove');
            const targetParent = target.parentElement;
            if (e.target === deleteButton) {
                targetParent.removeChild(target);
            };
            renderTotalBasketPrice();
        }
    );
};

function order() {
    const orderSubmitButton = document.querySelector('.panel__form');
    orderSubmitButton.addEventListener(
        'submit',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target;
            const errors = target.querySelector('.errors');
            const totalPrice = target.querySelector('.order__total-price-value').innerText;
            const email = target.querySelector('input[name=email]').value;
            const panelSummary = document.querySelector('.panel__summary ');
            const totalPriceItem = document.querySelector('.order__total-price-value');

            validation.clearErrorMessages(errors);
            validation.formValidation(orderPanel);

            if (Array.from(panelSummary.children).length < 2) {
                alert('Nie wybrano wycieczek!');
            } else if (errors.children.length < 1 && totalPriceItem.innerText !== '0 PLN') {
                sendOrder();
                clearOrderForm(target);
                alert(`Dzi??kujemy za z??o??enie zam??wienia o warto??ci ${totalPrice}. Szczeg????y zam??wienia zosta??y wys??ane na adres e-mail: ${email}.`);
            } else if (totalPriceItem.innerText === '0 PLN') {
                alert('Warto???? wybranych wycieczek wynosi 0 PLN!');
            } else {
                validation.clearErrorMessages(errors);
                validation.formValidation(orderPanel);
            };
        }
    );
};

function clearOrderForm(form) {
    form.querySelector('input[name=name]').value = '';
    form.querySelector('input[name=email]').value = '';
};