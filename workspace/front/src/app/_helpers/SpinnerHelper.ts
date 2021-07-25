import * as $ from 'jquery';
import 'gasparesganga-jquery-loading-overlay';
let singleton;

/**
 * Loading spinner service to display/hide loading spinner
 */
class SpinnerHelper {

    /**
     * Show loading spinner
     */
    show(){
        ($ as any).LoadingOverlay("show");
    }

    /**
     * Hide loading spinner
     */
    hide(){
        ($ as any).LoadingOverlay("hide");
    }
}

export default ((): SpinnerHelper => {
    if(!singleton){
        singleton = new SpinnerHelper();
    }
    return singleton;
})();