// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content') || "";

    //This will check if CodeMirror has loaded:
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror did not load');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    //When the editor is ready, this will set the value to whatever is currently stored in indexedDb, then it falls back to localStorage if nothing else is stored in indexedDb, and if neither of them are available, it sets the value to header.
    getDb().then((data) => {
      console.info('Data loaded from IndexedDB and injected into editor');
      console.log("what is data", data);
      if (data.content) {
        this.editor.setValue(data.content);
      } else {
        this.editor.setValue(localData || header);
      }
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue() || "");
    });

    //Will save the content of the editor when the editor itself loses focus:
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content') || "");
    });
  }
}
