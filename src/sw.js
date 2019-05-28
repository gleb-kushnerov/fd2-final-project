import {OrderStorage} from "./scripts/indexedDb";

let PERMISSION;
let orderId;

self.addEventListener('message', ({data: event}) => {
    switch (event.type) {
        case 'notificationPermission':
            return saveNotificationPermission(event.data);
        case 'showNotification':
            return setTimeout(showUserNotification, event.data.delay);
        case 'changeOrder':
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
            body: 'Your cab is ready!',
            tag: 'vibration-sample'
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