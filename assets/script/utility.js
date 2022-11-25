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

export { onEvent, select, selectAll, create, print }