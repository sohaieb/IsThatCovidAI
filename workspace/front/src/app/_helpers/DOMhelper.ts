export default class DOMhelper {
    static render(pageName: string, elementID = 'home') {
        let fileModule = import(`../views/${pageName}.html`);
        let result = fileModule.then(data => data.default);
        result
            .then(html     => {
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
}