import {Page} from "../../scripts/page";
import {OrderStorage} from "../../scripts/indexedDb";
import {nameRegExp, phoneRegExp, regExp} from "../../scripts/regExp";
import {lengthAndPatternValidation, removeErrorPlate} from "../../scripts/validation";
import {paramsForTimeout} from "../../scripts/order-info";
import {
    createOrderInfoPlate,
    restoreFormTimeout,
    setMinValueAtr
} from "../../scripts/functions/functions";


export class Home extends Page {
        constructor() {
        super();
        this.storage = new OrderStorage();
        this.storage.init()
    }
    async resolve () {
        return {
            template: await fetch(require('./home-page.html')).then(res => res.text()),
            image: await this.loadImage('./assets/images/header-car.jpg')
        };
    }

    async render () {
        let homePage = document.createElement('div');
        homePage.innerHTML = await this.resolvedData.template;
        return homePage;
    }

    async afterRender() {
        let headerEl = document.getElementById('img-container'),
            formContainerEl = document.getElementById('form-container'),
            dateInputEl = document.getElementById('tariffs-date');
        setMinValueAtr(dateInputEl);
        headerEl.append(this.resolvedData.image);
        formContainerEl.addEventListener('click', this);
        formContainerEl.addEventListener('input', this);
        let orders = await this.storage.getAll();
        if (orders.length !== 0 && !orders[orders.length - 1].complete) {
            createOrderInfoPlate(orders);
        }
    }

    async handleEvent(event) {
       switch (event.type) {
           case 'click':
               let submitBtnEl = event.target.closest('#form-submit-btn'),
                   formContainerEl = document.getElementById('form-container');
               if (submitBtnEl) {
                   event.preventDefault();
                   let form = new FormData(document.forms.namedItem('book-cab-form')),
                       test = form.get('name').length !== 0 && form.get('phone').length !== 0 && form.get('when').length !== 0 && form.get('time').length !== 0 && form.get('start').length !== 0 && form.get('end').length !== 0 && form.get('class') !== '1' && nameRegExp.test(form.get('name')) && phoneRegExp.test(form.get('phone'));
                   if (test) {
                       this.makeOrder();
                       paramsForTimeout.formHtml = formContainerEl.innerHTML;
                       let orders = await this.storage.getAll();
                       createOrderInfoPlate(orders);
                       if (orders) {
                           restoreFormTimeout(orders);
                       }
                   } else {
                       lengthAndPatternValidation();
                       let selectEl = document.getElementById('select-class');
                       if (selectEl.value === '1') {
                           selectEl.nextElementSibling.classList.add('error');
                           selectEl.nextElementSibling.textContent = 'This field can\'t be empty';
                       }
                   }
               }
           case 'input':
               removeErrorPlate(event);
               let selectEl = event.target.closest('select');
               if (selectEl) {
                   let errorSpanEl = selectEl.nextElementSibling;
                   errorSpanEl.classList.remove('error');
                   errorSpanEl.textContent = '';
               }
       }
    }

    async makeOrder() {
        let form = new FormData(document.forms.namedItem('book-cab-form')),
            orderInfo = {
                name: form.get('name'),
                phone: form.get('phone'),
                date: new Date(form.get('when')),
                time: form.get('time'),
                start: form.get('start'),
                end: form.get('end'),
                class: form.get('class'),
                complete: false
            };
        this.storage.add(orderInfo);
    }

    destroy() {
        let formContainerEl = document.getElementById('form-container');
        if (formContainerEl) {
            formContainerEl.removeEventListener('click', this);
            formContainerEl.removeEventListener('input', this);
        }
        super.destroy();
    }
}