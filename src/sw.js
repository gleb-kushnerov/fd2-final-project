let PERMISSION;

self.addEventListener('message', ({data: event}) => {
    switch (event.type) {
        case 'notificationPermission':
            return saveNotificationPermission(event.data);
        case 'showNotification':
            return setTimeout(showUserNotification, event.data.delay)
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
        let event = await self.registration.showNotification(null, {
            body: 'Your cab is ready!',
            tag: 'vibration-sample'
        });
        console.log(event);
    }
}