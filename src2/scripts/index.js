import {Footer} from "./footer.js";
import {CabInfo} from "./cab-info.js";
import {HeaderFull} from "./header-full.js";

export let headerEl = new HeaderFull();
export let mainContentEl = new CabInfo();
export let footerEl = new Footer();

export let headerMainEl = document.getElementById('header-main');
export let sectionMainContentEl = document.getElementById('main-content');
export let footerMainEl = document.getElementById('footer');

headerMainEl.append(headerEl.mainContentEl);
sectionMainContentEl.append(mainContentEl.cabInfoEl);
footerMainEl.append(footerEl.containerEL);



