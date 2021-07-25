import DOMhelper from "./DOMhelper";
import {RouterMiddleware} from "../_middleware/RouterMiddleware";
import {getActionsFor} from "../_config/Globals";

let router: RouterMiddleware;
router = RouterMiddleware.getInstance();

/**
 * The Application container class to bootstrap the hole logic of the app.
 */
export default class App {
    private static singleton: App;
        private constructor() {}

    /**
     * Get singleton instance of App
     */
    static getInstance() {
        if(!this.singleton){
            this.singleton = new App();
        }
        return this.singleton;
    }

    /**
     * Bootstrapp the hole Application
     */
    init(){
        /**  Global index buttons actions */
        let GLOBAL_ACTIONS = getActionsFor(router);
        /** Bootstrap App Logic **/
        router.catchRouteAndNavigate();
        DOMhelper.startButtonsListener(GLOBAL_ACTIONS);
        router.startRoutingListener();
    }
}