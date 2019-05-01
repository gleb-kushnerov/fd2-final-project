import {Page} from "../../../scripts/page.js";
import {orderInfo} from "../../../scripts/order-info.js";
import {OrderStorage} from "../../../scripts/indexedDb.js";

export class Step4Order extends Page {
    storage = new OrderStorage();

    constructor() {
        super();
        this.storage.init();
    }
    async resolve () {
        return {
            template: await fetch('pages/order-now/step-4/step-4.html').then(res => res.text())
        };
    }

    async render () {
        let page = document.createElement('div');
        page.innerHTML = await this.resolvedData.template;
        return page;
    }

    afterRender() {
        let nextStepBtnEl = document.getElementById('step-4-btn');
        nextStepBtnEl.addEventListener('click', this);
    }

    handleEvent() {
        let startInputEl = document.getElementById('tariffs-start'),
            endInputEl = document.getElementById('tariffs-end');
        orderInfo.start = startInputEl.value;
        orderInfo.end = endInputEl.value;
        this.storage.add(orderInfo);
    }

    destroy() {
        let nextStepBtnEl = document.getElementById('step-4-btn');
        if (nextStepBtnEl) {
            nextStepBtnEl.removeEventListener('click', this);
        }
        super.destroy();
    }
}