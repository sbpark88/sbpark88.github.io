// @ts-check

class Optional {
  #kind;
  #value;

  constructor(kind, value) {
    this.#kind = kind;
    this.#value = value;
  }

  static #some(value) {
    return new Optional('some', value);
  }

  static get #none() {
    return new Optional('none');
  }

  static of(value) {
    if (value === undefined || value === null) {
      return Optional.#none;
    } else {
      return Optional.#some(value);
    }
  }

  get() {
    return this.#value;
  }

  map(transform) {
    switch (this.#kind) {
      case 'some':
        return Optional.#some(transform(this.#value));
      case 'none':
        return Optional.#none;
    }
  }

  flatMap(transform) {
    switch (this.#kind) {
      case 'some':
        return transform(this.#value);
      case 'none':
        return Optional.#none;
    }
  }

  apply(wrappedTransform) {
    switch (wrappedTransform.#kind) {
      case 'some':
        return this.map(wrappedTransform.#value);
      case 'none':
        return Optional.#none;
    }
  }
}

const Initializer = (value) => Optional.of(value);

export { Initializer as Optional };
