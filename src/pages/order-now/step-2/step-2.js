import {Page} from "../../../scripts/page.js";
import {orderInfo} from "../../../scripts/order-info.js";
import {nameRegExp} from "../../../scripts/regExp.js";
import {phoneRegExp} from "../../../scripts/regExp.js";
import {lengthAndPatternValidation, removeErrorPlate} from "../../../scripts/validation.js";

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
        let nameplateEl = document.getElementById('nameplate');
        nameplateEl.addEventListener('click', this);
        nameplateEl.addEventListener('input', this);
    }

    handleEvent(event) {
        let nameInputEl = document.getElementById('tariffs-name'),
            phoneInputEl = document.getElementById('tariffs-phone');
        switch (event.type) {
            case 'click':
                let btnEl = event.target.closest('a');
                if (btnEl) {
                    event.preventDefault();
                    if (nameInputEl.value.length !== 0 && phoneInputEl.value.length !== 0 && nameRegExp.test(nameInputEl.value) && phoneRegExp.test(phoneInputEl.value)) {
                        orderInfo.name = nameInputEl.value;
                        orderInfo.phone = phoneInputEl.value;
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
        let nameplateEl = document.getElementById('nameplate');
        if (nameplateEl) {
            nameplateEl.removeEventListener('click', this);
            nameplateEl.removeEventListener('input', this);
        }
        super.destroy();
    }
}



