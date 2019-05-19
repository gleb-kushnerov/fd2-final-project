const DB_NAME = 'ORDERS';
const ITEMS_STORAGE_NAME = 'ITEMS';

export class OrderStorage {
    db;

    init () {
        return new Promise((resolve, reject) => {
            let openRequest = indexedDB.open(DB_NAME, 1);
            openRequest.onerror = err => reject(err);
            openRequest.onsuccess = () => resolve(this.db = openRequest.result);
            openRequest.onupgradeneeded = event => {
                let db = event.target.result;
                db.createObjectStore(ITEMS_STORAGE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true
                });
            };
        });
    }

    add (item) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([ITEMS_STORAGE_NAME], 'readwrite');
            let objectStore = transaction.objectStore(ITEMS_STORAGE_NAME);
            let request = objectStore.add(item);
            request.onerror = err => reject(err);
            request.onsuccess = () => resolve(request.result);
        });
    }

    getAll () {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([ITEMS_STORAGE_NAME], 'readonly');
            let storage = transaction.objectStore(ITEMS_STORAGE_NAME);
            let request = storage.getAll();
            request.onerror = err => reject(err);
            request.onsuccess = () => resolve(request.result);
        });
    }

    change (id) {
        return new Promise((resolve, reject) => {
            let transaction = this.db.transaction([ITEMS_STORAGE_NAME], 'readwrite');
            let objectStore = transaction.objectStore(ITEMS_STORAGE_NAME);
            let request = objectStore.get(id);
            request.onerror = err => reject(err);
            request.onsuccess = () => {
                request.result.complete = true;
                objectStore.put(request.result)
            };
        });
    }
}

