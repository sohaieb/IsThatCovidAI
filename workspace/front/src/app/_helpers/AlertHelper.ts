import * as $ from 'jquery';
import Swal, {SweetAlertIcon} from 'sweetalert2';
let singleton;
type SwalConfig = {title: string, text: string};
/**
 * Alert service to display/hide Swal Alert
 */
class AlertHelper {

    /**
     * Show success alert
     */
    success({title,text}:SwalConfig){
        this.displaySwal({title,text, icon: 'success'});
    }


    /**
     * Show information alert
     */
    information({title,text}:SwalConfig){
        this.displaySwal({title,text, icon: 'info'});
    }

    /**
     * Show information alert
     */
    warning({title,text}:SwalConfig){
        this.displaySwal({title,text, icon: 'warning'});
    }

    /**
     * Show error alert
     */
    error({title,text}: SwalConfig){
        this.displaySwal({title,text, icon: 'error'});
    }

    /**
     * Display swal2 alert with given config
     *
     * @param title
     * @param text
     * @param icon
     * @private
     */
    private displaySwal({title,text, icon}: {title: string, text: string, icon: SweetAlertIcon}) {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText: 'Ok'
        });
    }
}

export default ((): AlertHelper => {
    if(!singleton){
        singleton = new AlertHelper();
    }
    return singleton;
})();