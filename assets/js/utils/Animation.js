// @ts-check

import { $ } from './render.js';

export default class Animation {
  /** @type {object} */
  #addons = {};

  /** @type {HTMLElement} */
  #target;

  /** @type {object} */
  #from;

  /** @type {object} */
  #to;

  /** @type {boolean} */
  #run = false;

  /** @type {number} */
  #reqId;

  /**
   * Create Animation Instance
   *
   * @param {string | HTMLElement} $el
   * @param {object} [addons] - Warp the args by `${}` like this { FooAddon, BarAddon }.
   */
  constructor($el, addons) {
    // @ts-expect-error
    this.#target = $el instanceof HTMLElement ? $el : $($el);
    for (const addonName in addons) {
      this.#addons[addonName] = addons[addonName];
    }
  }

  /**
   * Set addon
   * @param {object} addons - Warp the args by `${}` like this { FooAddon, BarAddon }.
   * @returns {this}
   */
  setAddons(addons) {
    for (const addonName in addons) {
      this.#addons[addonName] = addons[addonName];
    }
    return this;
  }

  from(style) {
    this.#from = style;
    return this;
  }

  to(style) {
    this.#to = style;
    return this;
  }

  run(seconds) {
    const self = this;

    if (self.#run) return;
    self.#run = true;

    const properties = Object.keys(self.#to);
    self.#ommitedAddonCheck(properties);
    const from = self.#mergeComputedAndFrom.bind(self, properties)();
    const to = self.#to;

    return new Promise((resolve, reject) => {
      let start;

      const duration = seconds * 1000;
      const transitions = self.#getTransitionInfo(properties, from, to);

      self.#reqId = requestAnimationFrame(draw);

      function draw(timestamp) {
        if (start === undefined) start = timestamp;

        const elapsed = timestamp - start;
        const isThereTimeLeft = elapsed < duration;
        if (isThereTimeLeft) {
          const progress = elapsed / duration;
          const changedStyleEntries = transitions.map((transition) =>
              self.#isColorProperty(transition.property)
                  ? makeColorEntry({ transition, progress })
                  : makeShapeEntry({ transition, progress })
          );
          const changedStyle = Object.fromEntries(changedStyleEntries);

          Object.assign(self.#target.style, changedStyle);
          self.#reqId = requestAnimationFrame(draw);
        } else {
          Object.assign(self.#target.style, self.#to);
          self.#run = false;
          resolve(self);
        }
      }

      function makeColorEntry({ transition, progress }) {
        const { property, getInterpolateRgb } = transition;
        return [property, getInterpolateRgb(progress)];
      }

      function makeShapeEntry({ transition, progress }) {
        const { property, from, diff, unit } = transition;
        const newValue = from + diff * progress;
        return [property, `${newValue}${unit}`];
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.#reqId);
  }

  #ommitedAddonCheck(properties) {
    const colorAddonCheck = (properties) => {
      const hasColorProperty =
          properties.find(this.#isColorProperty) !== undefined;
      const hasColorAddon = this.#addons.ColorAddon !== undefined;

      if (hasColorProperty && !hasColorAddon) {
        throw new AnimationError('Color Addon missed.');
      }
    };

    colorAddonCheck(properties);

    return null;
  }

  #splitValueWithUnit(valueWithUnit) {
    if (this.#isString(valueWithUnit)) {
      const unit = this.#getUnit(valueWithUnit);
      const value = parseFloat(valueWithUnit.replace(unit, ''));
      return { value, unit };
    } else {
      return { value: valueWithUnit, unit: '' };
    }
  }

  #isString(str) {
    return typeof str === 'string';
  }

  #getUnit(str) {
    const units = /px|vw|vh|em|rem|%/;
    return str.match(units)?.[0] ?? '';
  }

  #extractFromComputedStyle(properties) {
    const computedStyle = getComputedStyle(this.#target);
    const targetStyle = properties.map((property) => [
      property,
      computedStyle[property],
    ]);
    return Object.fromEntries(targetStyle);
  }

  #mergeComputedAndFrom(properties) {
    const computedStyle = this.#extractFromComputedStyle(properties);
    const from = this.#from;

    return from === undefined
        ? computedStyle
        : Object.assign({}, computedStyle, from);
  }

  #getTransitionInfo(properties, from, to) {
    const colorTransition = (property) => {
      const addon = this.#addons.ColorAddon;

      const fromRgb = addon.toRgb(from[property]);
      const toRgb = addon.toRgb(to[property]);

      return {
        property: property,
        getInterpolateRgb: addon.interpolateRgb(fromRgb, toRgb),
      };
    };

    const shapeTransition = (property) => {
      const { value: fromValue } = this.#splitValueWithUnit(from[property]);
      const { value: toValue, unit } = this.#splitValueWithUnit(to[property]);

      return {
        property: property,
        from: fromValue,
        diff: toValue - fromValue,
        unit: unit,
      };
    };

    const transitionEntries = properties.map((property) =>
        this.#isColorProperty(property)
            ? colorTransition(property)
            : shapeTransition(property)
    );

    return transitionEntries;
  }

  #isColorProperty(property) {
    return property.toLowerCase().endsWith('color');
  }
}

class AnimationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
