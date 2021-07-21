import {ROUTER} from "../routes/Routing";
import DOMhelper from "../_helpers/DOMhelper";
import {Route} from "../_types/GlobalTypes";

/**
 * Router middle where is responsible for routing system
 */
export class RouterMiddleware {
    static singleton: RouterMiddleware;

    private constructor() {}

    /**
     * Get router middle where singleton instance
     */
    static getInstance() {
        if(!this.singleton){
            return new RouterMiddleware();
        }
        return this.singleton;
    }

    /**
     * Navigate to entire route
     *
     * @param routeName
     */
    public navigate(routeName: string) : void {
        let urlObj = new URL(location.href);
        let routingObject;
        routingObject = this.getExactRoute(this.getRoutingObjectByRouteName(routeName));
        history.pushState('','',urlObj.origin+ routingObject.path);
        DOMhelper.render(routingObject.component, routingObject.elementId);
    }

    /**
     * Navigate to entire route by catched window url path name
     *
     * @param routeName
     */
    public catchRouteAndNavigate() : void {
        let urlObj = new URL(location.href);
        let routingObject;
        routingObject = this.getRouteObjectByPathName(urlObj.pathname);
        history.pushState('','',urlObj.origin+ routingObject.path);
        DOMhelper.render(routingObject.component, routingObject.elementId);
    }

    /**
     * Start routing middleware listening
     */
    public startRoutingListener() {
        window.onpopstate = (e) => {
            let urlObj = new URL(location.href);
            let routingObject;
            let route = this.getRouteKeyByPathName(urlObj.pathname);
            routingObject = this.getExactRoute(this.getRoutingObjectByRouteName(route));
            DOMhelper.render(routingObject.component, routingObject.elementId);
        };
    }

    /**
     * Get routing object by route name
     *
     * @param routeName
     * @private
     */
    private getRoutingObjectByRouteName(routeName: string) {
        routeName = this.checkRouteExists(routeName);
        return ROUTER[routeName];
    }

    /**
     * Check if route exists or dispatch it to ALL (redirection)
     *
     * @param route
     * @private
     */
    private checkRouteExists(route: string) : string {
        let keys = Object.keys(ROUTER);
        if (!keys.includes(route) || route === 'all') {
            route = 'all';
        }
        return route;
    }

    /**
     * Check if there is a redirection in the routing object
     * and get the exact asked route
     *
     * @param routingObject
     * @private
     */
    private getExactRoute(routingObject: Route) : Route {
        if(routingObject.redirect){
            return ROUTER[routingObject.redirect];
        }
        return routingObject;
    }

    /**
     * Get route Key by visited Path Name
     *
     * @param {string} pathName
     * @private
     */
    private getRouteKeyByPathName(pathName: string) : string {
        let arrayedObject = Object.entries(ROUTER);
        let find = arrayedObject.find(routeObject => routeObject[1].path == pathName);
        return find?find[0]:'all';
    }

    /**
     * Get routing object by path name
     *
     * @param pathName
     * @private
     */
    private getRouteObjectByPathName(pathName: string) : Route {
        let routeName = this.getRouteKeyByPathName(pathName);
        routeName = this.checkRouteExists(routeName);
        return this.getExactRoute(this.getRoutingObjectByRouteName(routeName));
    }
}