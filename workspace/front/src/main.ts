import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import './app/controllers/index';
import DOMhelper from "./app/_helpers/DOMhelper";
import {RouterMiddleware} from "./app/_middleware/RouterMiddleware";

//  DOMhelper.render('home');
RouterMiddleware.checkRoute();