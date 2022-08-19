import ExcursionsAPI from "./ExcursionsAPI";
import RenderExcursion from "./RenderExcursion";

class Render {
    constructor() {
    };
    
    loadExcursions() {
        const renderExcursion = new RenderExcursion()
        const excursions = new ExcursionsAPI();
        renderExcursion.cleanExcursionsContainer();
        excursions
            .downloadExcursions()
            .then(data => renderExcursion.displayExcursions(data));
    };
};

export default Render;