'use strict';

class HeaderFull {
    element = document.createElement('section');
    headerEl = document.createElement('div');
    logoEl = document.createElement('div');
    navEl = document.createElement('nav');
    ulEL = document.createElement('ul');

    constructor(arr) {
        this.element.classList.add('header-full');
        this.headerEl.classList.add('header');
        this.logoEl.classList.add('logo');
        this.logoEl.innerHTML = `
                <h1>Cab<span>Hub</span></h1>
                <p>Call and relax</p>
            `;
        this.headerEl.append(this.logoEl);
        this.createMenu(arr);
        this.navEl.append(this.ulEL);
        this.headerEl.append(this.navEl);
        this.element.append(this.headerEl);
    }


    createMenu(arr) {
        let listArr = Array.isArray(arr) ? arr : ['Home','Features','Order now','Contacts'];
        this.ulEL.append(listArr.reduce((fragment, el) => {
                let liEl = document.createElement('li'),
                    aEL = document.createElement('a');
                aEL.setAttribute('href', '#');
                aEL.textContent = `${el}`;
                liEl.append(aEL);
                fragment.append(liEl);
                return fragment;
            }, document.createDocumentFragment())
        );
        return this.ulEL;
    }
}