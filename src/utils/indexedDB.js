// src/utils/indexedDB.js
import { openDB } from 'idb';

const DB_NAME = 'coffeeAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'coffeeBeans';

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveCoffeeBeans(beans) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await Promise.all(beans.map((bean) => tx.store.put(bean)));
  await tx.done;
}

export async function getCachedCoffeeBeans() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
