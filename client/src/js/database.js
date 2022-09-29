import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Jate database already exists!');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//function will let you add to the IndexDb database
export const putDb = async (content) => { 

console.log('PUT success to the db');

//This variable creates a connection to the database and specify the version we want to use:
  const jateDb = await openDB('jate', 1);
  
  //Will create a new transaction and specify the store and data privileges:
  const tx = jateDb.transaction('jate', 'readwrite');
  
  //Variable opens up the desired object store:
  const store = tx.objectStore('jate');
  
  //.add() method on the store and pass in the content:
  const request = store.put({content, id:1 });
  
  //To get confirmation of the request:
  const result = await request;
  console.log('🚀 - data saved to the database', result);

}


// TODO: Add logic for a method that gets all the content from the database
//
export const getDb = async () => 
console.log('GET all from the database');

//creates a connection to the IndexedDB database and the version we want to use:
const contactDb = await openDB('jate', 1);

//This will create a new transaction and specify the store and data privileges:
const tx = contactDb.transaction('jate', 'readonly');

//variable opens up the desired object store:
const store = tx.objectStore('jate');

//This variable uses the .getAll() method to get all data in the database:
const request = store.getAll();

//Will get confirmation of the request:
const result = await request;
console.log('result.value', result);
return result;


console.error('getDb not implemented');

initdb();
