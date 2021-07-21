import {RoutingConfig} from "../_types/GlobalTypes";

export const ROUTER: RoutingConfig = {
    home: {
        path: '/home',
        component: 'home', // component: is the file name of both view and it's .ts controller.
        elementId: 'home'
    },
    about: {
        path: '/about',
        component: 'aboutus',
        elementId: 'about'
    },
    // all is a standard when no of the previous routes are executed
    all: {
        redirect: 'home' // name of ROUTER
    }
};