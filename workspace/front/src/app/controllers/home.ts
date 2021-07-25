import HttpClient from "../_helpers/HttpClient";
import {Controller} from "../_interfaces/Controller";
import {ENV_CONFIG} from "../_config/Globals";
import {HttpRequestBody} from "../_types/GlobalTypes";
import SpinnerHelper from "../_helpers/SpinnerHelper";
import AlertHelper from "../_helpers/AlertHelper";

let singleton: Home;


class Home implements Controller {
    init(): void {
        let form = document.forms[0];
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let fd = new FormData(form);
            //form.
            SpinnerHelper.show();
            this.runHttpRequest(fd,
                data => {
                    SpinnerHelper.hide();
                    if (data.status / 100 !== 2) {
                        AlertHelper.error({
                            title: 'Error',
                            text: data.statusText
                        });
                        return;
                    }
                    data.json()
                        .then(
                            (data: any) => {
                                let alertOptions: {method: string, title: string, text: string};
                                if (data.result.covid) {
                                    alertOptions = {
                                        method: 'warning',
                                        title: 'Positive',
                                        text: 'Unfortunately You have COVID!'
                                    }
                                } else {
                                    alertOptions = {
                                        method: 'success',
                                        title: 'Negative',
                                        text: `Fortunately You don't have COVID! please take care!`
                                    }
                                }
                                Object.getPrototypeOf(AlertHelper)[alertOptions.method]({
                                    title: alertOptions.title,
                                    text: alertOptions.text
                                });
                            }
                        );
                },
                error => {
                    console.log('err');
                    SpinnerHelper.hide();
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
