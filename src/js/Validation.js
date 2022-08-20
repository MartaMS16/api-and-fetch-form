class Validation {
    formValidation(container) {
        const regForName = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/;
        const regFOrEmail = /\S+@\S+\.\S+/;
        const reg1 = new RegExp(regForName);
        const reg2 = new RegExp(regFOrEmail);
        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');

        if (name.value === '') {
            this.createErrorMessage(container, 'Nie wypełniono pola "Imię i nazwisko"!');
        } else if (!reg1.test(name.value)) {
            this.createErrorMessage(container, 'Podano błędne dane w polu "Imię i nazwisko"!');
        };

        if (email.value === '') {
            this.createErrorMessage(container, 'Nie wypełniono pola "Email"!');
        } else if (!reg2.test(email.value)) {
            this.createErrorMessage(container, 'Podano błędny adres email!');
        };
    };

    adminPanelValidation(container){
        const name = container.querySelector('input[name="name"]');
        const description = container.querySelector('textarea');
        const priceForAdult = container.querySelector('input[name="adult"]').value;
        const priceForChild = container.querySelector('input[name="child"]').value;
        
        if (name.value === '') {
            this.createErrorMessage(container, 'Nie wypełniono pola "Nazwa"!');
        };
        if (description.value === '') {
            this.createErrorMessage(container, 'Nie wypełniono pola "Opis"!');
        };
        if (Number(priceForAdult) === 0 || Number(priceForAdult) < 0) {
            this.createErrorMessage(container, 'Nieprawidłowe dane w polu "Cena dorosły"!');
        };
        if (Number(priceForChild) === 0 || Number(priceForChild) < 0) {
            this.createErrorMessage(container, 'Nieprawidłowe dane w polu "cena dziecko"!');
        };
    };

    validateNumbersOfParticipants(container) {
        const numberOfAdults = Number(container.querySelector('input[name=adults]').value);
        const numberOfChildren = Number(container.querySelector('input[name=children]').value);

        if (numberOfAdults === 0 || numberOfAdults < 0) {
            this.createErrorMessage(container, 'Liczba osób dorosłych jest nieprawidłowa!');
        };
        if (numberOfChildren === 0 || numberOfChildren < 0) {
            this.createErrorMessage(container, 'Liczba dzieci jest nieprawidłowa!');
        };
    };

    createErrorMessage(form, message) {
        const errors = form.querySelector('.errors');
        const errorMessage = document.createElement('li');
        errorMessage.innerText = message;
        errors.appendChild(errorMessage);
    };

    renderErrorMessages(container) {
        const errors = document.createElement('ul');
        errors.className = 'errors';
        container.appendChild(errors)
    };

    clearErrorMessages(errors) {
        if (errors) {
            while (errors.firstChild) {
                errors.removeChild(errors.firstChild);
            };
        };
    };
};

export default Validation;