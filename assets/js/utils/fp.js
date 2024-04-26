// @ts-check

/**
 * Pipe function make functions stream.
 * @param {Function} fns
 * @returns {Function}
 */
export const pipe = (...fns) => (initValue) =>
    fns.reduce((acc, fn) => (acc instanceof Promise ? acc.then(fn) : fn(acc)), initValue,);

/**
 * Apply curry a function
 * @param {Function} fn - A function to apply currying.
 * @returns {function(...[unknown]): unknown} - Curried function.
 */
export const curry = (fn) => {
  return function curryFn(...args1) {
    if (args1.length >= fn.length) {
      return fn(...args1);
    } else {
      return (...args2) => {
        return curryFn(...args1, ...args2);
      };
    }
  };
};

/**
 * Insert delay in async function
 * @param {number} milliseconds
 * @returns {Promise<null>}
 */
export const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));
