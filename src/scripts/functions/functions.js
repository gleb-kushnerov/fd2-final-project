import {paramsForTimeout} from "../order-info";
import {OrderStorage} from "../indexedDb";

export async function restoreForm() {
    let formContainerEl = document.getElementById('form-container'),
        formHtml = await fetch(require('./form-content.html')).then(res => res.text());
    if (formHtml) {
        formContainerEl.innerHTML = formHtml;
    }
    let storage = new OrderStorage(),
        flag = await storage.init();
    if (flag) {
        storage.change(paramsForTimeout.id);
    }
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
    sendDelayToWorker(paramsForTimeout.delay);
}

async function sendDelayToWorker(delay) {
    let registration = await navigator.serviceWorker.getRegistration();

    registration.active.postMessage({
        type: 'showNotification',
        data: {
            header: 'CabHub',
            delay: delay
        }
    });
}