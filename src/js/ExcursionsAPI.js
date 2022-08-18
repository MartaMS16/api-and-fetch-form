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
};

export default ExcursionsAPI;