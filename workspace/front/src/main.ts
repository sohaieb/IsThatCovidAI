/**
 * Imports
 * */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import App from './app/_helpers/App';


/**
 * Application Bootstrap
 * */

/** Lazy loading modules **/
window.onload = (ev) => {
    import('./app/controllers/index').then();
};
App.getInstance().init();

