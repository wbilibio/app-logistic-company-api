/* eslint-disable no-proto */
export abstract class GenericException extends Error {
  constructor(message?: string) {
    super(message);

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, new.target.prototype);
    } else {
      (this as any).__proto__ = new.target.prototype;
    }
  }
}
