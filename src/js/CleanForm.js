class CleanForm {
    cleanForm(container, adultEl, childEl) {
        const title = container.querySelector('input[name="name"]');
        const description = container.querySelector('textarea');

        if (title) {
            title.value = '';
        };
        if (description) {
            description.value = '';
        };
        adultEl.value = '';
        childEl.value = '';
    };
};

export default CleanForm;