/**
 * Used to define a route
 */
export type Route =  {path?:string, component?:string, redirect?:string, elementId?: string};

/**
 * Used to define a actioned button event (exp. 'click') callback
 */
export type ButtonCallback = (e: Event) => void;

/**
 * Global routing system configuration
 */
export type RoutingConfig = {
    [route: string] : Route
};