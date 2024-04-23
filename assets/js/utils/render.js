// @ts-check

/**
 * DOM Selector
 * @param {string} selector - CSS selector
 * @returns {NodeListOf<Element> | Element}
 */
const $ = (selector) => {
  const nodeList = document.querySelectorAll(selector);
  return nodeList.length === 1 ? nodeList[0] : nodeList;
};

/**
 * Check Array
 * @param {unknown} something
 * @returns {boolean}
 */
const arrayCheck = (something) => something instanceof Array;

/**
 * Make HTML string for rendering.
 * @param {string | string[]} html - HTML string
 * @returns {string} - Normalized HTML string
 */
const normalizeHTML = (html) => (arrayCheck(html) ? html.join("") : html);

/**
 * Render template inside the child of the target element.
 * @param {HTMLElement} el - Target element to render a template.
 * @returns {function(string): void} - Render function
 */
const render = (el) => (html = "") => (el.innerHTML = normalizeHTML(html));

/**
 * Render page with components
 * @param template
 * @param el
 * @returns {Function}
 */
const init = (template, el = "#app") => (components) => {
  const container = $(el);
  render(container)(template);
  components();
};

export {$, render, init};
