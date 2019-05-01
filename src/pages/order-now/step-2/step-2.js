import {Page} from "../../../scripts/page.js";
import {orderInfo} from "../../../scripts/order-info.js";

export class Step2Order extends Page{
    async resolve () {
        return {
            template: await fetch('pages/order-now/step-2/step-2.html').then(res => res.text())
        };
    }

    async render () {
        let page = document.createElement('div');
        page.innerHTML = await this.resolvedData.template;
        return page;
    }

    afterRender() {
        let nextStepBtnEl = document.getElementById('step-2-btn');
        nextStepBtnEl.addEventListener('click', this);
    }

    handleEvent() {
        let nameInputEl = document.getElementById('tariffs-name'),
            phoneInputEl = document.getElementById('tariffs-phone');
        orderInfo.name = nameInputEl.value;
        orderInfo.phone = phoneInputEl.value;
    }

    destroy() {
        let nextStepBtnEl = document.getElementById('step-2-btn');
        if (nextStepBtnEl) {
            nextStepBtnEl.removeEventListener('click', this);
        }
        super.destroy();
    }
}



