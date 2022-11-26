'use strict';






function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
  return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

function create(element, parent = document) {
  return parent.createElement(element);
}

function print(element) {
  console.log(element);
}
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

const text = select('.text');
const button = select('.button');
const output = select('.output');
const word = select('.word');
const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;
const objects = [];
word.innerText = `Contacts: ${objects.length}`

function emailValidation(email, regex, output) {
  if (!regex.test(email)) {
    output.innerText = 'Invalid Email';
    setTimeout (() => {
      noOutput()
    }, 3_000)
    return false
  } else {
    return email;
  }
}

function validateCopies(newObj) {
  let valid = true;
  if (objects.length > 0) {
    let newEmail = newObj.email;
    objects.forEach(obj => {
      if (obj.getAttribute('email') === newEmail) {
        word.innerText = 'Contact has already been added';
        setTimeout(() => {
          word.innerText = `Contacts: ${objects.length}`;
        }, 3_000);
        valid = false;
      }
    })
  } 
  return valid
}

function noOutput() {
  word.innerText = `Contacts: ${objects.length}`;
}

function contactList(newObj, parent) {
  let contactBox = create('div');

  contactBox.setAttribute('name', newObj.name);
  contactBox.setAttribute('city', newObj.city);
  contactBox.setAttribute('email', newObj.email);
  contactBox.setAttribute('onmouseout', 'noOutput()')
  contactBox.innerHTML = `<p>Name: ${newObj.name}</p><p>City: ${newObj.city}</p><p>Email: ${newObj.email}</p>`;
  parent.prepend(contactBox);

  return contactBox
}

function inputValidation(inp) {
  if (inp.includes(',')) {
    let array = inp.split(', ');
    let name = array[0];
    let city = array[1];
    let email = emailValidation(array[2], emailRegex, word);
    let contact = new Contact(name, city, email);
    let validObject = validateCopies(contact);
    if (email != false && objects.length < 12 && validObject) {
      let newObject = contactList(contact, output);
      objects.unshift(newObject);
      word.innerText = `Contacts: ${objects.length}`
      text.value = '';
    } else if (objects.length === 12) {
      word.innerText = 'Content Full';
      setTimeout(() => {
        noOutput()
      }, 3_000);
    }
  } else {
    word.innerText = "Please use the format 'name, city, email'"
    setTimeout(() => {
      noOutput()
    }, 5_000);
  }
}

onEvent('click', button, function() {
  inputValidation(text.value);
})

text.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    button.click();
  }
});