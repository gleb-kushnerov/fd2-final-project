import {paramsForTimeout} from "../order-info";
import {regExp} from "../regExp";

export async function restoreForm() {
    let formContainerEl = document.getElementById('form-container'),
        formHtml = await fetch(require('./form-content.html')).then(res => res.text());
    if (formHtml) {
        formContainerEl.innerHTML = formHtml;
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
    let dateInputEl = document.forms.namedItem('book-cab-form').elements.namedItem('when');
    let dateValueStr = `${new Intl.DateTimeFormat('ko-KR').format(new Date)}`
        .replace(/\. /g, '-')
        .replace(/\./, '')
        .replace(regExp, '-0$1-');
    dateInputEl.setAttribute('min', dateValueStr);
}

