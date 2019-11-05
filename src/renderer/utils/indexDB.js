const Datastore = require("nedb");

import { remote } from "electron";
const path = require("path");
const savePath = path.join(remote.app.getPath("userData"), "xfanreadDB.db");
export let IndexDB = new (class {
  constructor() {
    this.db = new Datastore({ filename: savePath, autoload: true });
  }
  insert(item) {
    return new Promise((resolve, reject) => {
      this.db.insert(item, (err, newDoc) => {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    });
  }

  find(searchParam) {
    if (Object.prototype.toString.call(searchParam) !== "[object Object]") {
      console.error("查询参数必须为object类型");
      return false;
    }
    return new Promise((resolve, reject) => {
      this.db.find(searchParam, function(err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this.db.remove(id, { multi: true }, (err, numRemoved) => {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    });
  }

  update(id, params) {
    return new Promise((resolve, reject) => {
      this.db.update(id, { $set: params }, { multi: true }, function(
        err,
        numReplaced
      ) {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced);
        }
      });
    });
  }
})();
// IndexDB.remove({}).then(res => {
//   console.log(res, "remove");
// });
// IndexDB.find({}).then(res => {
//   console.log(res, "find");
// });
