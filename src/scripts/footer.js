import {MainElementsParent} from "./main-elements-parent.js";

export class Footer extends MainElementsParent {
    containerEL = document.createElement('div');

    constructor() {
        super();
        this.containerEL.classList.add('container');
        this.loadContent('content/footer-content.html', 'text')
            .then(result => this.containerEL.insertAdjacentHTML('afterbegin', result));
    }
}


