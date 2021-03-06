import {RouterMiddleware} from "../_middleware/RouterMiddleware";
import DOMhelper from "../_helpers/DOMhelper";


/**
 * Global Application Environment configuration
 */
export const ENV_CONFIG = {
    apiURL: ' http://localhost:3000'
};


/**
 * Get Global Functions
 *
 * @param router
 */
export function getActionsFor(router: RouterMiddleware){
    return [
        {
            action: 'click',
            button: document.getElementById('home'),
            callback: (e: MouseEvent) => {
                let route = DOMhelper.getRouteFromHtmlElement((e.target as HTMLElement));
                router.navigate(route);
            }
        },
        {
            action: 'click',
            button: document.getElementById('about'),
            callback: (e: MouseEvent) => {
                let route = DOMhelper.getRouteFromHtmlElement((e.target as HTMLElement));
                router.navigate(route);
            }
        }
    ]
}