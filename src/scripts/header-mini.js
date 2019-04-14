'use strict';

class HeaderMini {
    mainContentEl = document.createElement('section');
    headerEl = document.createElement('div');
    logo = new HeaderLogo();
    nav = new HeaderNav();

    constructor() {
        this.mainContentEl.classList.add('header-full');
        this.headerEl.classList.add('header');
        this.headerEl.append(this.logo.logoEl);
        this.headerEl.append(this.nav.navEl);
        this.mainContentEl.append(this.headerEl);
    }
}
