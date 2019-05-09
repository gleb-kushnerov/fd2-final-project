import {Page} from "../../../scripts/page.js";
import {orderInfo} from "../../../scripts/order-info.js";
import {OrderStorage} from "../../../scripts/indexedDb.js";
import {lengthAndPatternValidation, removeErrorPlate} from "../../../scripts/validation.js";

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
        let nameplateEl = document.getElementById('nameplate-four');
        nameplateEl.addEventListener('click', this);
        nameplateEl.addEventListener('input', this);
    }

    handleEvent(event) {
       switch (event.type) {
           case 'click':
               let btnEl = event.target.closest('a'),
                   inputStartEl = document.getElementById('tariffs-start'),
                   inputEndEl = document.getElementById('tariffs-end');
               if (btnEl) {
                   event.preventDefault();
                   if (inputStartEl.value.length !== 0 && inputEndEl.value.length !== 0) {
                       orderInfo.start = inputStartEl.value;
                       orderInfo.end = inputEndEl.value;
                       this.storage.add(orderInfo);
                       location.href = btnEl.href;
                   } else {
                       lengthAndPatternValidation();
                   }
               }
           case 'input': {
               removeErrorPlate();
           }
       }
    }

    destroy() {
        let nextStepBtnEl = document.getElementById('step-4-btn');
        if (nextStepBtnEl) {
            nextStepBtnEl.removeEventListener('click', this);
        }
        super.destroy();
    }
}