import './../css/admin.css';
import ExcursionsAPI from './ExcursionsAPI';
import RenderExcursion from './RenderExcursion';

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadExcursions();
    addExcursion();
};

const loadExcursions = () => {
    const excursions = new ExcursionsAPI();
    const render = new RenderExcursion()
    render.cleanExcursionsContainer();
    excursions
        .downloadExcursions()
        .then(data => render.displayExcursions(data));
};

const addExcursion = () => {
    const submitButton = document.querySelector('.order__field-submit');
    const excursions = new ExcursionsAPI();

    submitButton.addEventListener(
        'click',
        (e) => {
            e.preventDefault();
            excursions.handleSubmit()
                .then(loadExcursions)
                .then(cleanForm)
        }
    );
};

function cleanForm() {
    const title = document.querySelector('input[name="name"]');
    const description = document.querySelector('textarea');
    const adultPrice = document.querySelector('input[name="adult"]');
    const childPrice = document.querySelector('input[name="child"]');

    title.value = '';
    description.value = '';
    adultPrice.value = '';
    childPrice.value = '';
};