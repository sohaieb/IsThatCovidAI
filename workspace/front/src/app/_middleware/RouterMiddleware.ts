import {ROUTER} from "../routes/Routing";
import DOMhelper from "../_helpers/DOMhelper";

export class RouterMiddleware {
    static checkRoute() {
        let urlObj = new URL(location.href);
        let keys = Object.keys(ROUTER);
        console.log(urlObj.pathname);
        DOMhelper.render(keys[1]);
    }
}