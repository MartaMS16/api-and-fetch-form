import './../css/client.css';
import ExcursionsAPI from './ExcursionsAPI';
import RenderExcursion from './RenderExcursion';

document.addEventListener('DOMContentLoaded', init);

function init(){
    loadExcursions();
};

const loadExcursions = () => {
    const excursions = new ExcursionsAPI();
    excursions
        .downloadExcursions()
        .then(data => {
            const render = new RenderExcursion()
            render.displayExcursions(data);
        }
        );
};