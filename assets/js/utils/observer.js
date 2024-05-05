// @ts-check

/* Intersection Observer */
import {debounce} from "./performance.js";

const createIObserver = (callback, options = {threshold: 0.2}) =>
    new IntersectionObserver(callback, options);

const twoWayCallback = (entries) =>
    entries.forEach((entry) =>
        entry.isIntersecting
            ? entry.target.classList.add("show")
            : entry.target.classList.remove("show"),
    );

const downwardCallback = (entries) =>
    entries.forEach((entry) => {
      const topIsIntersecting = entry.boundingClientRect.top >= 0;
      if (topIsIntersecting) {
        entry.isIntersecting
            ? entry.target.classList.add("show")
            : entry.target.classList.remove("show");
      }
    });

const upwardCallback = (entries) =>
    entries.forEach((entry) => {
      const topIsHiding = entry.boundingClientRect.top < 0;
      if (topIsHiding) {
        entry.isIntersecting
            ? entry.target.classList.add("show")
            : entry.target.classList.remove("show");
      }
    });

const observer = createIObserver(twoWayCallback);
const observerDownward = createIObserver(downwardCallback);
const observerUpward = createIObserver(upwardCallback);

/* Mutation Observer */
const createMObserver = (callback) => new MutationObserver(callback);

const observerMutations = (callback, delay) => {
  const debouncedCallback = debounce(callback, delay);

  return createMObserver((mutations) => {
    mutations.forEach((mutation) => {
      debouncedCallback(mutation);
    });
  });
};

const mutationConfig = {
  attributes: false,
  childList: true,
  subtree: true,
};

export {
  observer,
  observerDownward,
  observerUpward,
  observerMutations,
  mutationConfig,
};
