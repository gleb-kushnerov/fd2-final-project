import {Page} from "../../scripts/page.js";
import {orderInfo} from "../../scripts/order-info.js";

export class OrderNow extends Page{
    async resolve () {
        return {
            template: await fetch('pages/order-now/order-now.html').then(res => res.text()),
            image1: await this.loadImage('assets/images/tariffs-car.png'),
            image2: await this.loadImage('assets/images/tariffs-car.png'),
            image3: await this.loadImage('assets/images/tariffs-car.png')
        };
    }

    async render () {
        let page = document.createElement('div');
        page.innerHTML = await this.resolvedData.template;
        return page;
    }

    afterRender() {
        let tarriff1El = document.getElementById('tariffs-item-1'),
            tarriff2El = document.getElementById('tariffs-item-2'),
            tarriff3El = document.getElementById('tariffs-item-3');
        tarriff1El.insertAdjacentElement('afterbegin', this.resolvedData.image1);
        tarriff2El.insertAdjacentElement('afterbegin', this.resolvedData.image2);
        tarriff3El.insertAdjacentElement('afterbegin', this.resolvedData.image3);

        let tariffsContainerEl = document.getElementById('tariffs-container');
        tariffsContainerEl.addEventListener('click', this);
    }

    handleEvent(event) {
        let btnEl = event.target.closest('.first-step-btn');
        if (btnEl) {
            orderInfo.class = btnEl.dataset.class;
        }
    }

    destroy() {
        let tariffsContainerEl = document.getElementById('tariffs-container');
        if (tariffsContainerEl) {
            tariffsContainerEl.removeEventListener('click', this);
        }
        super.destroy();
    }
}