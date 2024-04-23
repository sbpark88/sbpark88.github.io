// @ts-check

/**
 * Event binding function
 * @param {Window | Element} $el
 * @param {String} eventType
 * @param {Function} listener
 * @returns {*}
 */
export const eventBind = ({
                            $el,
                            eventType = "click",
                            listener
                          }) => $el.addEventListener(eventType, listener);
