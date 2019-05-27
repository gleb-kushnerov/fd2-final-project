import {Router} from "./scripts/router";
import {routes} from "./scripts/routes";
import '../src/styles/style.scss';

let router = new Router(routes, document.body);

router.start();

navigator.serviceWorker.register('./sw.js').then(async registration => {
    let permission = await Notification.requestPermission();

    registration.active.postMessage({
        type: 'notificationPermission',
        data: permission
    });
});