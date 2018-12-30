/* 
  Example got from Cameron Nokes github's repo
  https://github.com/ccnokes/electron-tutorials/blob/master/storing-data/store.js
*/
const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor({ configName = 'user-preferences', defaults = {} } = {}) {
    // renderer has to get `app` module via remote, main gets it directly
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, configName + '.json');
    this.data = parseDataFile(this.path, defaults);
  }

  sets(fields = {}) {
    const keys = Object.keys(fields);
    if (keys.length > 0) {
      keys.forEach((key) => {
        const val = fields[key];
        if (val) {
          this.set(key, val);
        }
      })
    }
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

}

function parseDataFile(filePath, defaults = {}) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    return defaults;
  }
}

module.exports = Store;