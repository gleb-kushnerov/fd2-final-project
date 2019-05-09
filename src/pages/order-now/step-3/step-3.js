import {Page} from "../../../scripts/page.js";
import {orderInfo} from "../../../scripts/order-info.js";
import {lengthAndPatternValidation, removeErrorPlate} from "../../../scripts/validation.js";

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
        let nameplateEl = document.getElementById('nameplate-three');
        nameplateEl.addEventListener('click', this);
        nameplateEl.addEventListener('input', this);
    }

    handleEvent(event) {
        switch (event.type) {
            case 'click':
                let btnEl = event.target.closest('a'),
                    dateInputEl = document.getElementById('tariffs-date'),
                    timeInputEl = document.getElementById('tariffs-time');
                if (btnEl) {
                    event.preventDefault();
                    if (dateInputEl.value.length !== 0 && timeInputEl.value.length !== 0) {
                        orderInfo.date = new Date(dateInputEl.value);
                        orderInfo.time = timeInputEl.value;
                        location.href = btnEl.href;
                    } else {
                        lengthAndPatternValidation();
                    }
                }
            case 'input':
                removeErrorPlate();
        }

    }

    destroy() {
        let nameplateEl = document.getElementById('nameplate-three');
        if (nameplateEl) {
            nameplateEl.removeEventListener('click', this);
            nameplateEl.removeEventListener('input', this);
        }
        super.destroy();
    }
}