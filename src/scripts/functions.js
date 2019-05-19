import {paramsForTimeout} from "./order-info.js";
import {OrderStorage} from "./indexedDb.js";

export async function restoreForm() {
    let formContainerEl = document.getElementById('form-container'),
        formHtml = await fetch('pages/home/form-content.html').then(res => res.text());
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
}