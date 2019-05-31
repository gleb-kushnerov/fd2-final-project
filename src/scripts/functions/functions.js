import {paramsForTimeout} from "../order-info";
import {dayRegExp, monthRegExp} from "../regExp";

export async function restoreForm() {
    let formContainerEl = document.getElementById('form-container'),
        formHtml = await fetch(require('./form-content.html')).then(res => res.text());
    if (formHtml && formContainerEl) {
        formContainerEl.innerHTML = formHtml;
        formContainerEl.classList.remove('plate');
    }
    setMinValueAtr();
}

function getMilliseconds(time, date) {
    let timeArr = time.split(':');
    return new Date(date).setHours(parseInt(timeArr[0]), parseInt(timeArr[1]));
}


export function restoreFormTimeout(orders) {
    let lastOrder = orders[orders.length - 1];
    paramsForTimeout.delay = getMilliseconds(lastOrder.time, lastOrder.date) - Date.now();
    paramsForTimeout.id = lastOrder.id;
    setTimeout(restoreForm, paramsForTimeout.delay);
    sendDelayToWorker(paramsForTimeout.delay, paramsForTimeout.id);
}

async function sendDelayToWorker(delay, id) {
    let registration = await navigator.serviceWorker.getRegistration();

    registration.active.postMessage({
        type: 'showNotification',
        data: {
            delay: delay
        }
    });
    registration.active.postMessage({
        type: 'changeOrder',
        data: {
            orderId: id
        }
    });
}

export function setMinValueAtr() {
    let formData = document.forms.namedItem('book-cab-form');
    if (formData) {
        let dateInputEl = formData.elements.namedItem('when');
        let dateValueStr = `${new Intl.DateTimeFormat('ko-KR').format(new Date)}`
            .replace(/\. /g, '-')
            .replace(/\./, '')
            .replace(monthRegExp, '-0$1-')
            .replace(dayRegExp, '-0$1');
        dateInputEl.setAttribute('min', dateValueStr);
    }
}

export function createOrderInfoPlate(orders) {
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
    formContainerEl.classList.add('plate');
}

