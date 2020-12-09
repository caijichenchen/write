const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function Promise(exctour) {
  this.status = "pending";
  this.result = null;
  this.callbacks = [];

  const resolve = data => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.result = data;
    this.callbacks.length &&
      this.callbacks.forEach(cb => {
        cb.onResolved(this.result);
      });
  };

  const reject = data => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.result = data;
    this.callbacks.length &&
      this.callbacks.forEach(cb => {
        cb.onRejected(this.result);
      });
  };

  try {
    exctour(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  onResolved = typeof onResolved === "function" ? onResolved : value => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : reason => {
          throw reason;
        };
  return new Promise((resolve, reject) => {
    const handle = callback => {
      try {
        const cbResult = callback(this.result);
        if (cbResult instanceof Promise) {
          cbResult.then(resolve, reject);
        } else {
          resolve(cbResult);
        }
      } catch (error) {
        reject(error);
      }
    };
    if (this.status === FULFILLED) {
      setTimeout(() => {
        handle(onResolved);
      });
    }
    if (this.status === REJECTED) {
      setTimeout(() => {
        handle(onRejected);
      });
    }
    if (this.status === PENDING) {
      this.callbacks.push({
        onResolved() {
          handle(onResolved);
        },
        onRejected() {
          handle(onRejected);
        }
      });
    }
  });
};

Promise.prototype.catch = function (onRejected) {
  return new Promise((resolve, reject) => {
    this.then(undefined, onRejected);
  });
};

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

Promise.all = function (promises) {
  const len = promises.length;
  const values = [];
  let i = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        res => {
          values[index] = res;
          i++;
          i === len && resolve(values);
        },
        err => {
          reject(err);
        }
      );
    });
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  });
};
