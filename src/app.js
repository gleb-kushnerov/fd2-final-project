import {Router} from "./scripts/router";
import {routes} from "./scripts/routes";
import '../src/styles/style.scss'

let router = new Router(routes, document.body);

router.start();