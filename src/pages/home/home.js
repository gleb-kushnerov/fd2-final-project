import {Page} from "../../scripts/page.js";
import {OrderStorage} from "../../scripts/indexedDb.js";

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

    afterRender() {
        let headerEl = document.getElementById('img-container'),
            submitBtn = document.getElementById('form-submit-btn');

        headerEl.append(this.resolvedData.image);
        submitBtn.addEventListener('click', this);
        this.storage.getAll()
                .then(async orders => {
                        if (orders.length !== 0) {
                            this.createOrderInfoPlate(orders)
                        }
                    });
    }

    handleEvent(event) {
        event.preventDefault();
        this.makeOrder();
        this.storage.getAll()
            .then(async orders => {
                    this.createOrderInfoPlate(orders)
            });
        let submitBtn = document.getElementById('form-submit-btn');
        submitBtn.removeEventListener('click', this);
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
                class: form.get('class')
            };
        this.storage.add(orderInfo);
    }

    destroy() {
        let submitBtn = document.getElementById('form-submit-btn');
        if (submitBtn) {
            submitBtn.removeEventListener('click', this);
        }
        super.destroy();
    }
}