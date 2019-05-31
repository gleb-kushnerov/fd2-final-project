import {Page} from "../../../scripts/page";
import {orderInfo} from "../../../scripts/order-info";
import {OrderStorage} from "../../../scripts/indexedDb";
import {lengthAndPatternValidation, removeErrorPlate} from "../../../scripts/validation";
import {restoreFormTimeout} from "../../../scripts/functions/functions";

export class Step4Order extends Page {
    constructor() {
        super();
        this.storage = new OrderStorage();
        this.storage.init();
    }
    async resolve () {
        return {
            template: await fetch(require('./step-4-page.html')).then(res => res.text())
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

    async handleEvent(event) {
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
                       let orders = await this.storage.getAll();
                       if (orders) {
                           restoreFormTimeout(orders);
                       }
                       location.href = btnEl.href;
                   } else {
                       lengthAndPatternValidation();
                   }
               }
           case 'input': {
               removeErrorPlate(event);
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