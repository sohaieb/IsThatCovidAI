import * as $ from 'jquery';
import HttpClient from "../_helpers/HttpClient";
import {Controller} from "../_interfaces/Controller";
import {ENV_CONFIG} from "../_config/Globals";
import {HttpRequestBody} from "../_types/GlobalTypes";

let singleton: Home;

class Home implements Controller {
    init(): void {
        let form = document.forms[0];
        let fd = new FormData(form);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.runHttpRequest(fd,
                data => {
                    console.log(data); // on success display alert
                },
                error => {
                    console.log(error);
                }
            );
        });
    }

    runHttpRequest(fd: HttpRequestBody, success: (data: any) => void, error: (error: any) => void) {
        HttpClient
            .getInstance({
                url: `${ENV_CONFIG.apiURL}/result`,
                body: fd,
                method: 'post'
            })
            .run()
            .then(dt => success(dt))
            .catch(err => error(err));
    }
}

/**
 * Return singleton
 */
export default (() => {
    if (!singleton) {
        singleton = new Home();
    }
    return singleton;
})();
