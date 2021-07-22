import * as $ from 'jquery';
import HttpClient from "../_helpers/HttpClient";
import {Controller} from "../_interfaces/Controller";
let singleton: Home;

class Home implements Controller {
    init(): void {
        console.log('init');
        let form = document.forms[0];
        let fd = new FormData(form);
        form.addEventListener('submit',(e) => {
            e.preventDefault();
            console.log('submitted');
        });
        /*HttpClient.getInstance({
            url: 'http://localhost:8480/',
            body: fd,
            method: 'post'
        })
            .run()
            .then(dt => null)
        ;*/

    }
}

export default (()=> {
    if(!singleton) {
        singleton = new Home();
    }
    return singleton;
})();
