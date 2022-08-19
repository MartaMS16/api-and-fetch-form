class RenderExcursion {
    constructor() {
        this.container = document.querySelector('.panel__excursions');
        this.prototype = document.querySelector('.excursions__item--prototype');
    };

    clonePrototype(prototype, container) {
        const element = prototype.cloneNode(true);
        element.classList.remove(`${container}__item--prototype`);
        return element;
    };

    displayExcursions(excursions) {
        if (excursions) {
            excursions.forEach(excursion => {
                const liEl = this.clonePrototype(this.prototype, 'excursions');
                const liTitle = liEl.querySelector('.excursions__title');
                const liDescription = liEl.querySelector('.excursions__description');
                const excursionsForm = liEl.querySelector('.excursions__form');
                const excursionsField = excursionsForm.querySelectorAll('.excursions__field');
                const [adult, child] = excursionsField;
                const priceForAdult = adult.querySelector('strong');
                const priceForChild = child.querySelector('strong');
                liEl.dataset.id = excursion.id;
                liTitle.innerText = excursion.title;
                liDescription.innerText = excursion.description;
                priceForAdult.innerText = excursion.priceForAdult + ' ';
                priceForChild.innerText = excursion.priceForChild + ' ';
                this.container.appendChild(liEl);
            });
        }
    };

    cleanExcursionsContainer() {
        if (this.container.children.length > 1) {
            if (this.container.lastChild) {
                while (this.container.lastChild && this.container.lastChild.className != 'excursions__item excursions__item--prototype') {
                    this.container.removeChild(this.container.lastChild);
                };
            };
        };
    };
};

export default RenderExcursion;