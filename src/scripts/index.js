'use strict';

let headerEl = new HeaderFull(),
    mainContentEl = new CabInfo(),
    footerEl = new Footer();

let headerMainEl = document.getElementById('header-main'),
    sectionMainContentEl = document.getElementById('main-content'),
    footerMainEl = document.getElementById('footer');

headerMainEl.append(headerEl.mainContentEl);
sectionMainContentEl.append(mainContentEl.cabInfoEl);
footerMainEl.append(footerEl.containerEL);



