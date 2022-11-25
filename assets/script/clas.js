'use strict';

class Contact {
  #name;
  #city;
  #email;

  constructor(name, city, email) {
    this.#name = name;
    this.#email = email;
    this.#city = city
  }

  get email() {
    return this.#email;
  }

  get city() {
    return this.#city;
  }

  get name() {
    return this.#name;
  }
}

export { Contact };