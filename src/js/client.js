import './../css/client.css';
import ExcursionsAPI from './ExcursionsAPI';
import RenderExcursion from './RenderExcursion';

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

loadExcursions()
