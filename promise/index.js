function Promise(excutor) {
  this.status = "pendding";
  this.result = null;
  this.callbacks = [];

  const resolve = data => {
    if (this.status !== "pendding") return;
    this.status = "fulfilled";
    this.result = data;
    this.callbacks.length &&
      this.callbacks.forEach(cb => {
        cb.onResolved(this.result);
      });
  };

  const reject = data => {
    if (this.status !== "pendding") return;
    this.status = "rejected";
    this.result = data;
    this.callbacks.length &&
      this.callbacks.forEach(cb => {
        cb.onRejected(this.result);
      });
  };

  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  return new Promise((resolve, reject) => {
    if (this.status === "fulfilled") {
      try {
        const cbResult = onResolved(this.result);
        if (cbResult instanceof Promise) {
          cbResult.then(resolve, reject);
        } else {
          resolve(cbResult);
        }
      } catch (e) {
        reject(e);
      }
    }
    if (this.status === "rejected") {
      onRejected(this.result);
    }
    if (this.status === "pendding") {
      this.callbacks.push({
        onResolved: () => {
          console.log(this);
        },
        onRejected: () => {
          console.log(this);
        }
      });
    }
  });
};

Promise.prototype.catch = function (onRejected) {
  return new Promise((resolve, reject) => {
    this.Promise.then(undefined, onRejected);
  });
};

Promise.resolve = function (data) {
  return new Promise((resolve, reject) => {
    if (data instanceof Promise) {
      data.then(resolve, reject);
    } else {
      resolve(data);
    }
  });
};

Promise.reject = function (err) {
  return new Promise((resolve, reject) => {
    reject(err);
  });
};
