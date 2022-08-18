class ExcursionsAPI {
    constructor() {
        this.url = `http://localhost:3000`;
        this.excursionsUrl = `${this.url}/excursions`;
        this.ordersUrl = `${this.url}/orders`;
    };

    downloadExcursions() {
        return fetch(this.excursionsUrl)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                };
            })
            .catch(error => console.error(error));
    };

    handleSubmit = () => {
        const title = document.querySelector('input[name="name"]').value;
        const description = document.querySelector('textarea').value;
        const adultPrice = document.querySelector('input[name="adult"]').value;
        const childPrice = document.querySelector('input[name="child"]').value;

        return this.addNewExcursion(this.excursionsUrl, title, description, adultPrice, childPrice);
    };

    addNewExcursion = (url, title, description, priceForAdult, priceForChild) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                priceForAdult,
                priceForChild
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            };
        });
    };
};

export default ExcursionsAPI;