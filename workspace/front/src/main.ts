import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import './app/controllers/index';
import DOMhelper from "./app/_helpers/DOMhelper";
import {RouterMiddleware} from "./app/_middleware/RouterMiddleware";

let routingService = RouterMiddleware.getInstance();
routingService.catchRouteAndNavigate();
DOMhelper.startButtonsListener([
    {
        action: 'click',
        button: document.getElementById('home'),
        callback: (e: MouseEvent) => {
            let route = DOMhelper.getRouteFromHtmlElement((e.target as HTMLElement));
            routingService.navigate(route);
        }
    },
    {
        action: 'click',
        button: document.getElementById('about'),
        callback: (e: MouseEvent) => {
            let route = DOMhelper.getRouteFromHtmlElement((e.target as HTMLElement));
            routingService.navigate(route);
        }
    }
]);
routingService.startRoutingListener();

