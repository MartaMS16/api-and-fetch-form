class RenderExcursion {
    constructor() {
    };

    cloneExcursion() {
        const prototype = document.querySelector('.excursions__item--prototype');
        const liEl = prototype.cloneNode(true);
        liEl.classList.remove('excursions__item--prototype');
        return liEl;
    };

    displayExcursions(excursions) {
        excursions.forEach(excursion => {
            const container = document.querySelector('.panel__excursions ');
            const liEl = this.cloneExcursion();
            const liTitle = liEl.querySelector('.excursions__title');
            const liDescription = liEl.querySelector('.excursions__description');
            const excursionsForm = liEl.querySelector('.excursions__form');
            const excursionsField = excursionsForm.querySelectorAll('.excursions__field');
            const [adult, child] = excursionsField;
            const priceForAdult = adult.querySelector('strong')
            const priceForChild = child.querySelector('strong')
            liTitle.innerText = excursion.title;
            liDescription.innerText = excursion.description;
            priceForAdult.innerText = excursion.priceForAdult + ' ';
            priceForChild.innerText = excursion.priceForChild + ' ';
            container.appendChild(liEl);
        });
    };
};

export default RenderExcursion;