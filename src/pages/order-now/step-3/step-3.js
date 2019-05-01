import {Page} from "../../../scripts/page.js";
import {orderInfo} from "../../../scripts/order-info.js";

export class Step3Order extends Page{
    async resolve () {
        return {
            template: await fetch('pages/order-now/step-3/step-3.html').then(res => res.text())
        };
    }

    async render () {
        let page = document.createElement('div');
        page.innerHTML = await this.resolvedData.template;
        return page;
    }

    afterRender() {
        let nextStepBtnEl = document.getElementById('step-3-btn');
        nextStepBtnEl.addEventListener('click', this);
    }

    handleEvent() {
        let dateInputEl = document.getElementById('tariffs-date'),
            timeInputEl = document.getElementById('tariffs-time');
        orderInfo.date = new Date(dateInputEl.value);
        orderInfo.time = timeInputEl.value;
    }

    destroy() {
        let nextStepBtnEl = document.getElementById('step-3-btn');
        if (nextStepBtnEl) {
            nextStepBtnEl.removeEventListener('click', this);
        }
        super.destroy();
    }
}