import './../css/admin.css';
import ExcursionsAPI from './ExcursionsAPI';
import Render from './Render';
import CleanForm from './CleanForm';

const excursions = new ExcursionsAPI();
const excursionElement = document.querySelector('.excursions');
const render = new Render();

document.addEventListener('DOMContentLoaded', init);

function init() {
    render.loadExcursions();
    addExcursion();
    editExcursion();
    saveChanges();
    deleteExcursion();
};

const addExcursion = () => {
    const submitButton = document.querySelector('.order__field-submit');
    const container = document.querySelector('.form');
    const adultPrice = document.querySelector('input[name="adult"]');
    const childPrice = document.querySelector('input[name="child"]');
    const form = new CleanForm();

    submitButton.addEventListener(
        'click',
        (e) => {
            e.preventDefault();
            excursions.handleSubmitExcursions(container, excursions.addNewExcursion)
                .then(render.loadExcursions)
                .then(form.cleanForm(container, adultPrice, childPrice))
        }
    );
};

const editExcursion = () => {
    excursionElement.addEventListener(
        'click',
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target.parentElement.parentElement;
            const editButton = target.querySelector('.excursions__field-input--update');
            const targetParent = target.parentElement;
            const liTitle = targetParent.querySelector('.excursions__title');
            const liDescription = targetParent.querySelector('.excursions__description');
            const excursionsField = targetParent.querySelectorAll('.excursions__field');
            const [priceForAdultField, priceForChildField] = excursionsField;
            const priceForAdult = priceForAdultField.querySelector('strong');
            const priceForChild = priceForChildField.querySelector('strong');
            if (e.target === editButton && editButton.value === "edytuj") {
                liTitle.innerHTML = `<input class="form__field" name="name" value="${liTitle.innerText}">`;
                liDescription.innerHTML = `<textarea class="form__field form__field--longtext" name="description">${liDescription.innerText}</textarea>`;
                priceForAdult.parentElement.innerHTML = `Dorosły: <input class="order__form__field" type="number" name="adult" value="${priceForAdult.innerText.trim()}"/> PLN`;
                priceForChild.parentElement.innerHTML = `Dziecko: <input class="order__form__field" type="number" name="child" value="${priceForChild.innerText.trim()}"/> PLN`;
                setTimeout(() => {
                    editButton.value = "zapisz";
                }, 0);
            };
        }
    );
};

const saveChanges = () => {
    excursionElement.addEventListener(
        'click',
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target.parentElement.parentElement;
            const editButton = target.querySelector('.excursions__field-input--update');
            const targetParent = target.parentElement;
            if (e.target === editButton && editButton.value === "zapisz") {
                const targetId = targetParent.dataset.id;

                excursions.handleSubmitExcursions(targetParent, excursions.updateExcursion, targetId)
                    .then(render.loadExcursions);
            };
        }
    );
};

const deleteExcursion = () => {
    excursionElement.addEventListener(
        'click',
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target.parentElement.parentElement;
            const deleteButton = target.querySelector('.excursions__field-input--remove');
            const targetParent = target.parentElement;
            if (e.target === deleteButton) {
                const targetId = targetParent.dataset.id;
                const container = null;
                excursions.handleSubmitExcursions(container, excursions.deleteElement, targetId)
                    .then(render.loadExcursions);
            };
        }
    );
};