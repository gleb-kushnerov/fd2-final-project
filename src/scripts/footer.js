'use strict';

class Footer extends MainElementsParent {
    containerEL = document.createElement('div');

    constructor() {
        super();
        this.containerEL.classList.add('container');
        this.loadContent('server/footer-content.html', 'text')
            .then(result => this.containerEL.insertAdjacentHTML('afterbegin', result));
    }
}


