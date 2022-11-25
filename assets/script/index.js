'use strict';





import { select, selectAll, onEvent, create, print } from "./utils.js";
import { Contact } from "./classes.js";

const input = select('.input');
const addBtn = select('.add');
const outputBody = select('.output-body');
const outputText = select('.output-text');
const emailRegex = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;
const objects = [];

function validateEmail(email, regex, output) {
  if (!regex.test(email)) {
    output.innerText = 'invalid email';
    return false;
  } else {
    return email;
  }
}

function listContacts(newObj, parent) {
  let newContactCard = create('div');
  newContactCard.innerHTML = `<p>Name: ${newObj.name}</p>
                              <p>City: ${newObj.name}</p>
                              <p>Email: ${newObj.email}</p>`;

  newContactCard.setAttribute('onclick', 'this.remove()');
  parent.appendChild(newContactCard);
  return newContactCard;
}
  
function validateInput(inp, objArray, regex, output, outputParent) {
  let newObj;
  if (inp.includes(',')) {
    let array = inp.split(', ');
    let name = array[0];
    let city = array[1];
    let email = validateEmail(array[2], regex, output);
    if (email != false && objArray.length < 12) {
      newObj = new Contact(name, city, email);
      listContacts(newObj, outputParent)
      print('added')
      objArray.unshift(newObj);
    }
    print(objArray)
  }
}

onEvent('click', addBtn, function() {
  validateInput(input.value, objects, emailRegex, outputText, outputBody);
})