'use strict';

let headerEl = new HeaderFull(),
    mainContentEl = new CabInfo(),
    featuresEL = new Features(),
    reviewsEl = new Reviews(),
    footer = new Footer();

let headerMainEl = document.getElementById('header-main'),
    sectionMainContentEl = document.getElementById('main-content'),
    footerMainEl = document.getElementById('footer');

headerMainEl.append(headerEl.mainContentEl);
sectionMainContentEl.append(mainContentEl.cabInfoEl);
sectionMainContentEl.append(featuresEL.mainContentEl);
sectionMainContentEl.append(reviewsEl.reviewsEl);
footerMainEl.append(footer.containerEL);



