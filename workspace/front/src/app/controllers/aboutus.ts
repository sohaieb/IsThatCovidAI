import {Controller} from "../_interfaces/Controller";

let singleton;

class Aboutus implements Controller {
    init(): void {
        //  console.log('Loaded about us');
    }
}

export default (()=> {
    if(!singleton){
        singleton = new Aboutus();
    }
    return singleton;
})();