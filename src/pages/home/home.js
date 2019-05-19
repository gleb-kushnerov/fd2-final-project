import {Page} from "../../scripts/page.js";
import {OrderStorage} from "../../scripts/indexedDb.js";
import {nameRegExp, phoneRegExp} from "../../scripts/regExp.js";
import {lengthAndPatternValidation, removeErrorPlate} from "../../scripts/validation.js";
import {paramsForTimeout} from "../../scripts/order-info.js";
import {restoreFormTimeout} from "../../scripts/functions.js";


export class Home extends Page {
    storage = new OrderStorage();

    constructor() {
        super();
        this.storage.init()
    }
    async resolve () {
        return {
            template: await fetch('pages/home/home.html').then(res => res.text()),
            image: await this.loadImage('assets/images/header-car.jpg')
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
            dateInputEl = document.forms.namedItem('book-cab-form').elements.namedItem('when'),
            regExp = /-(\d)-/;
        let dateValueStr = `${new Intl.DateTimeFormat('ko-KR').format(new Date)}`
                .replace(/\. /g, '-')
                .replace(/\./, '')
                .replace(regExp, '-0$1-');
        dateInputEl.setAttribute('min', dateValueStr);
        headerEl.append(this.resolvedData.image);
        formContainerEl.addEventListener('click', this);
        formContainerEl.addEventListener('input', this);
        let orders = await this.storage.getAll();
        if (orders.length !== 0 && !orders[orders.length - 1].complete) {
            this.createOrderInfoPlate(orders);
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
                       this.createOrderInfoPlate(orders);
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
               removeErrorPlate();
               let selectEl = event.target.closest('select');
               if (selectEl) {
                   let errorSpanEl = selectEl.nextElementSibling;
                   errorSpanEl.classList.remove('error');
                   errorSpanEl.textContent = '';
               }
       }
    }

    createOrderInfoPlate(orders) {
        let formHeaderEl = document.createElement('div'),
            formLineEl1 = document.createElement('div'),
            formLineEl2 = document.createElement('div'),
            formLineEl3 = document.createElement('div'),
            formLineEl4 = document.createElement('div'),
            lastOrder = orders[orders.length - 1],
            fragment = document.createDocumentFragment(),
            formContainerEl = document.getElementById('form-container');

        formHeaderEl.innerHTML = '<h2>order <span>info</span></h2>';
        formHeaderEl.classList.add('form-header');
        formLineEl1.classList.add('form-line-info');
        formLineEl2.classList.add('form-line-info');
        formLineEl3.classList.add('form-line-info');
        formLineEl4.classList.add('form-line-info');
        formLineEl1.textContent = `Name: ${lastOrder.name}`;
        formLineEl2.innerHTML = `<span>When: ${new Intl.DateTimeFormat('ru').format(lastOrder.date)}</span> <span>Time: ${lastOrder.time}</span>`;
        formLineEl3.innerHTML = `<span>Start: ${lastOrder.start}</span> <span>End: ${lastOrder.end}</span>`;
        formLineEl4.textContent = `Class: ${lastOrder.class}`;
        fragment.append(formHeaderEl, formLineEl1, formLineEl2, formLineEl3, formLineEl4);
        formContainerEl.innerHTML = '';
        formContainerEl.append(fragment);
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