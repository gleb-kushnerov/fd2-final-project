import {OrderStorage} from "./scripts/indexedDb";
import {paramsForTimeout} from "./scripts/order-info";

let PERMISSION;
let orderId;

self.addEventListener('message', ({data: event}) => {
    switch (event.type) {
        case 'notificationPermission':
            return saveNotificationPermission(event.data);
        case 'showNotification':
            return setTimeout(showUserNotification, event.data.delay);
        case 'changeOrder':
            paramsForTimeout.delay = null;
            paramsForTimeout.id = null;
            return orderId = event.data.orderId;
    }
});

function saveNotificationPermission (permission) {
    PERMISSION = permission;
}

function isNotificationGranted () {
    return PERMISSION === 'granted';
}

async function showUserNotification () {
    if (isNotificationGranted()) {
        self.registration.showNotification('CabHub', {
            body: 'Your cab is ready!'
        });
    }
    changeOrderStatus(orderId);
}

async function changeOrderStatus(id) {
    let storage = new OrderStorage(),
        initStorage = await storage.init();
    if (initStorage) {
        storage.change(id);
    }
}