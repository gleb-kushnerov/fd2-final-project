'use strict';

class CabInfo {
    cabInfoEl = document.createElement('section');
    containerEl = document.createElement('div');
    aboutCab = new AboutCab();

    constructor() {
        this.cabInfoEl.classList.add('cab-info');
        this.containerEl.classList.add('container');
        this.containerEl.append(this.aboutCab.aboutCabEl);

        this.cabInfoEl.append(this.containerEl);
    }
}


class AboutCab extends MainElementsParent{
    aboutCabEl = document.createElement('div');
    buttonEl = document.createElement('button');

    constructor() {
        super();
        this.aboutCabEl.classList.add('about-cab');
        this.loadContent('server/about-cab-content.html', 'text')
            .then(result => this.aboutCabEl.insertAdjacentHTML('afterbegin', result));
        this.buttonEl.classList.add('btn');
        this.buttonEl.setAttribute('type', 'button');
        this.buttonEl.textContent = 'Read more';
        this.aboutCabEl.append(this.buttonEl);
    }
}

