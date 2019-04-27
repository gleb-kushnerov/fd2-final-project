import {Router} from "./scripts/router.js";
import {routes} from "./scripts/routes.js";

let router = new Router(routes, document.body);

router.start();