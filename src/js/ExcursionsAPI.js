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

    handleSubmit = (container, callback, id) => {
        const title = container.querySelector('input[name="name"]').value;
        const description = container.querySelector('textarea').value;
        const adultPrice = container.querySelector('input[name="adult"]').value;
        const childPrice = container.querySelector('input[name="child"]').value;

        return callback(this.excursionsUrl, title, description, adultPrice, childPrice, id);
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
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            if (response.ok) {
                return response.json();
            };
        });
    };

    updateExcursion = (url, title, description, priceForAdult, priceForChild, id) => {
        return fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                description,
                priceForAdult,
                priceForChild
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    };
};

export default ExcursionsAPI;