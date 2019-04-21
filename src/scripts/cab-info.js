import {MainElementsParent} from "./main-elements-parent.js";
import {headerMainEl, sectionMainContentEl} from "./index.js";
import {Features} from "./features.js";
import {HeaderMini} from "./header-mini.js";
import {OrderStorage} from "./indexedDb.js";


export class CabInfo {
    cabInfoEl = document.createElement('section');
    containerEl = document.createElement('div');
    aboutCab = new AboutCab();
    form = new Form();

    constructor() {
        this.cabInfoEl.classList.add('cab-info');
        this.containerEl.classList.add('container');
        this.containerEl.append(this.aboutCab.aboutCabEl);
        this.containerEl.append(this.form.formContentEl);
        this.cabInfoEl.append(this.containerEl);
    }
}


export class AboutCab extends MainElementsParent {
    aboutCabEl = document.createElement('div');
    buttonEl = document.createElement('button');

    constructor() {
        super();
        this.aboutCabEl.classList.add('about-cab');
        this.loadContent('content/about-cab-content.html', 'text')
            .then(result => this.aboutCabEl.insertAdjacentHTML('afterbegin', result));
        this.buttonEl.classList.add('btn');
        this.buttonEl.setAttribute('type', 'button');
        this.buttonEl.textContent = 'Read more';
        this.buttonEl.addEventListener('click', this);
        this.aboutCabEl.append(this.buttonEl);
    }

    handleEvent(event) {
        let readMoreBtn = event.target.closest('.btn');
        if (readMoreBtn) {
            sectionMainContentEl.innerHTML = '';
            headerMainEl.innerHTML = '';
            let featuresEL = new Features(),
                headerMiniEl = new HeaderMini();
            headerMainEl.append(headerMiniEl.mainContentEl);
            sectionMainContentEl.append(featuresEL.mainContentEl);
        }
    }
}


export class Form {
    formContentEl = document.createElement('div');
    formHeaderEl = document.createElement('div');
    formEl = document.createElement('form');
    formLineEl1 = document.createElement('div');
    formLineEl2 = document.createElement('div');
    formLineEl3 = document.createElement('div');
    formLineEl4 = document.createElement('div');
    submitBtnEl = document.createElement('button');
    nameInputEl = document.createElement('input');
    phoneInputEl = document.createElement('input');
    whenInputEl = document.createElement('input');
    timeInputEl = document.createElement('input');
    startInputEl = document.createElement('input');
    endInputEl = document.createElement('input');
    selectEl = document.createElement('select');
    storage = new OrderStorage();
    constructor() {
        this.formContentEl.classList.add('form');
        this.formHeaderEl.classList.add('form-header');
        this.formContentEl.append(this.formHeaderEl);
        this.storage.init()
            .then(() => this.storage.getAll())
            .then(orders => {
                if (orders.length === 0) {
                    this.createForm();
                } else {
                    this.createOrderInfo(orders);
                }
            });
    }

    handleEvent(event) {
        event.preventDefault();
        this.makeOrder();
        this.formEl.remove();
        this.storage.getAll()
            .then(orders => this.createOrderInfo(orders));
    }

    async makeOrder() {
        let form = new FormData(this.formEl),
            orderInfo = {
                name: form.get('name'),
                phone: form.get('phone'),
                date: new Date(form.get('when')),
                time: form.get('time'),
                start: form.get('start'),
                end: form.get('end'),
                class: form.get('class')
            };
        this.storage.add(orderInfo);
    }

    createOrderInfo(orders) {
        this.formHeaderEl.innerHTML = '<h2>order <span>info</span></h2>';
        let lastOrder = orders[orders.length - 1];
        let fragment = document.createDocumentFragment();
        this.formLineEl1.classList.add('form-line-info');
        this.formLineEl2.classList.add('form-line-info');
        this.formLineEl3.classList.add('form-line-info');
        this.formLineEl4.classList.add('form-line-info');
        this.formLineEl1.textContent = `Name: ${lastOrder.name}`;
        this.formLineEl2.innerHTML = `<span>When: ${new Intl.DateTimeFormat('ru').format(lastOrder.date)}</span> <span>Time: ${lastOrder.time}</span>`;
        this.formLineEl3.innerHTML = `<span>Start: ${lastOrder.start}</span> <span>End: ${lastOrder.end}</span>`;
        this.formLineEl4.textContent = `Class: ${lastOrder.class}`;
        fragment.append(this.formLineEl1, this.formLineEl2, this.formLineEl3, this.formLineEl4);
        this.formContentEl.append(fragment);
    }

    createForm() {
        this.formHeaderEl.innerHTML = '<h2>book a <span>cab</span></h2>';
        this.formLineEl1.classList.add('form-line');
        this.formLineEl2.classList.add('form-line');
        this.formLineEl3.classList.add('form-line');
        this.formLineEl4.classList.add('form-line');
        this.formEl.append(this.formLineEl1, this.formLineEl2, this.formLineEl3, this.formLineEl4);
        this.submitBtnEl.classList.add('btn');
        this.submitBtnEl.setAttribute('type', 'submit');
        this.submitBtnEl.textContent = 'submit';
        this.formEl.append(this.submitBtnEl);
        this.nameInputEl.setAttribute('type', 'text');
        this.nameInputEl.setAttribute('placeholder', 'Name');
        this.nameInputEl.setAttribute('name', 'name');
        this.formLineEl1.append(this.nameInputEl);
        this.phoneInputEl.setAttribute('type', 'text');
        this.phoneInputEl.setAttribute('placeholder', 'Phone');
        this.phoneInputEl.setAttribute('name', 'phone');
        this.formLineEl1.append(this.phoneInputEl);
        this.whenInputEl.setAttribute('type', 'date');
        this.whenInputEl.setAttribute('name', 'when');
        this.formLineEl2.append(this.whenInputEl);
        this.timeInputEl.setAttribute('type', 'time');
        this.timeInputEl.setAttribute('name', 'time');
        this.formLineEl2.append(this.timeInputEl);
        this.startInputEl.setAttribute('type', 'text');
        this.startInputEl.setAttribute('placeholder', 'Start');
        this.startInputEl.setAttribute('name', 'start');
        this.formLineEl3.append(this.startInputEl);
        this.endInputEl.setAttribute('type', 'text');
        this.endInputEl.setAttribute('placeholder', 'End');
        this.endInputEl.setAttribute('name', 'end');
        this.formLineEl3.append(this.endInputEl);
        this.selectEl.setAttribute('name', 'class');
        this.selectEl.innerHTML = `<option value="1">Choose Class</option>
                        <option value="economy">Economy</option>
                        <option value="standard">Standard</option>
                        <option value="business">Business</option>`;
        this.formLineEl4.append(this.selectEl);
        this.formContentEl.append(this.formEl);
        this.submitBtnEl.addEventListener('click', this);
    }
}

