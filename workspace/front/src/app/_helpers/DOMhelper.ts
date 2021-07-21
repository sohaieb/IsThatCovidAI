import {ButtonListener} from "../_interfaces/ButtonListener";

export default class DOMhelper {

    /**
     * Render the asked page
     *
     * @param pageName
     * @param elementID
     */
    static render(pageName: string, elementID: string = 'home') {
        let fileModule = import(`../views/${pageName}.html`);
        let result = fileModule.then(data => data.default);
        result.then(html => {
            let wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            let tempDOM = wrapper.querySelector(`#${elementID}`);
            let page = (document.importNode((tempDOM as any).content, true) as any);
            let container = document.body.querySelector('.container');
            container.innerHTML = '';
            container.appendChild(page);
        })
            .catch(error => console.log('Check your routing name or filename.'));

    }

    /**
     * Start button actions listening
     *
     * @param buttons
     */
    static startButtonsListener(buttons: Array<ButtonListener>) {
        buttons.forEach(
            btn => btn.button.addEventListener(btn.action, btn.callback)
        );
    }

    /**
     * Get Route from actioned element
     *
     * @param element
     */
    static getRouteFromHtmlElement(element: HTMLElement){
        return element.dataset.route;
    }
}