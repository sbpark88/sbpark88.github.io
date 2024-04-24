// @ts-check

/**
 * Provides utility functions for color manipulation.
 * @module ColorAddon
 */

/**
 * Interpolates between two RGB colors.
 *
 * @param {string} from - The starting RGB color in either hex or RGB format.
 * @param {string} to - The target RGB color in either hex or RGB format.
 * @returns {function} - A function that takes a progress value (0 to 1) and returns the interpolated RGB color.
 */
const interpolateRgb = (from, to) => {
  const [fromR, fromG, fromB] = splitRgbNumber(from);
  const [toR, toG, toB] = splitRgbNumber(to);
  const calcInterpolateRgb = (from, to, progress) =>
      Math.round(from + (to - from) * progress);

  return (progress) => {
    const [r, g, b] = [
      [fromR, toR],
      [fromG, toG],
      [fromB, toB],
    ].map(([from, to]) => calcInterpolateRgb(from, to, progress));

    return parseRgbFormat({ r, g, b });
  };
};

/**
 * Splits an RGB color string into its individual components.
 *
 * @private
 * @param {string} rgb - The RGB color string.
 * @returns {number[]} - An array containing the red, green, and blue values as numbers.
 */
const splitRgbNumber = (rgb) => {
  return [rgb].map(getRgbValueFromStr)[0].map(Number);
};

/**
 * Converts a color string to RGB format if it's in hex format.
 *
 * @private
 * @param {string} colorStr - The color string.
 * @returns {string} - The color string in RGB format.
 */
const toRgb = (colorStr) => {
  return isHexColor(colorStr) ? hexToRgb(colorStr) : colorStr;
};

/**
 * Determines if a color string is in hex format.
 *
 * @private
 * @param {string} colorStr - The color string.
 * @returns {boolean} - True if the color string is in hex format, otherwise false.
 */
const isHexColor = (colorStr) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorStr);
};

/**
 * Converts a hex color string to RGB format.
 *
 * @private
 * @param {string} hex - The hex color string.
 * @returns {string} - The color string in RGB format.
 */
const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex[0].repeat(2) + hex[1].repeat(2) + hex[2].repeat(2);
  }

  const [r, g, b] = [
    hexadecimalToDecimalNumber(hex.slice(0, 2)),
    hexadecimalToDecimalNumber(hex.slice(2, 4)),
    hexadecimalToDecimalNumber(hex.slice(4, 6)),
  ];

  return parseRgbFormat({ r, g, b });
};

/**
 * Converts a hexadecimal number to its decimal equivalent.
 *
 * @private
 * @param {string} hexadecimal - The hexadecimal number.
 * @returns {number} - The decimal equivalent of the hexadecimal number.
 */
const hexadecimalToDecimalNumber = (hexadecimal) => {
  return parseInt(hexadecimal, 16);
};

/**
 * Parses RGB values into a string formatted as 'rgb(r, g, b)'.
 *
 * @private
 * @param {object} colorObj - An object containing the red, green, and blue values.
 * @param {number} colorObj.r - The red value.
 * @param {number} colorObj.g - The green value.
 * @param {number} colorObj.b - The blue value.
 * @returns {string} - The RGB string.
 */
const parseRgbFormat = ({ r, g, b }) => {
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Splits an RGB color string into its individual components.
 *
 * @private
 * @param {string} colorStr - The RGB color string.
 * @returns {string[]} - An array containing the red, green, and blue values as numbers.
 */
const getRgbValueFromStr = (colorStr) => {
  return colorStr
      .replace('rgb(', '')
      .replace(')', '')
      .split(',')
      .map((str) => str.trim());
};

/**
 * Converts an RGB color string to its hexadecimal equivalent.
 *
 * @private
 * @param {string} colorStr - The RGB color string.
 * @returns {string} - The hexadecimal color string.
 */
const toHex = (colorStr) => {
  return isHexColor(colorStr) ? colorStr : rgbToHex(colorStr);
};

/**
 * Converts an RGB color string to its hexadecimal equivalent.
 *
 * @private
 * @param {string} rgb - The RGB color string.
 * @returns {string} - The hexadecimal color string.
 */
const rgbToHex = (rgb) => {
  const [r, g, b] = splitRgbNumber(rgb).map(toHexadecimal);
  return parseHexFormat({ r, g, b });
};

/**
 * Converts a decimal number to its hexadecimal equivalent.
 *
 * @private
 * @param {number} num - The decimal number.
 * @returns {string} - The hexadecimal representation of the decimal number.
 */
const toHexadecimal = (num) => {
  return num.toString(16).padStart(2, '0');
};

/**
 * Parses hexadecimal RGB values into a string formatted as '#RRGGBB'.
 *
 * @private
 * @param {object} colorObj - An object containing the red, green, and blue values.
 * @param {string} colorObj.r - The red value in hexadecimal.
 * @param {string} colorObj.g - The green value in hexadecimal.
 * @param {string} colorObj.b - The blue value in hexadecimal.
 * @returns {string} - The hexadecimal color string.
 */
const parseHexFormat = ({ r, g, b }) => {
  return `#${r}${g}${b}`;
};

export default {
  interpolateRgb,
  splitRgbNumber,
  toRgb,
  toHex,
};
