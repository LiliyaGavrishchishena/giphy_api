'use strict';

/*base params*/
const BASE_URL = 'http://api.giphy.com/v1/gifs';
const API_KEY = 'otQg2F3wXu9yyf6xNfnLaLBElBh0tmNr';
const RETURN_QUANTITY = '8';
let offset = 0;
let search = 'cat';

document.addEventListener('DOMContentLoaded', function(event) {
  getRandomInfo().then(data => {
    createGrid(data);
  });
});

/*API requests in order to get info*/
const form = document.querySelector('.js-form');
const refresh = document.querySelector('.js-update');
const input = form.querySelector('.js-input');
const list = document.querySelector('.js-list');

form.addEventListener('submit', handleFormSubmit);
refresh.addEventListener('click', handleStepOffset);

list.addEventListener('click', function(event) {
  let target = event.target;
  if (target.classList.contains('js-info')) {
    let parent = target.parentNode;
    let hidden = parent.querySelector('.overlay');
    hidden.classList.toggle('active');
  }
});

function handleStepOffset() {
  offset += 8;

  getUrlInfo(search).then(data => {
    createGrid(data);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  if (input.value === null) {
    return;
  } else {
    offset = 0;
    search = input.value;
    getUrlInfo(input.value).then(data => {
      createGrid(data);
    });
  }
}

function getUrlInfo(request) {
  return fetch(
    `${BASE_URL}/search?q=${request}&api_key=${API_KEY}&limit=${RETURN_QUANTITY}&offset=${offset}`,
  )
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .catch(error => {
      console.log('ERROR: ', error);
    });
}

function getRandomInfo() {
  return fetch(
    `${BASE_URL}/search?q='cat'&api_key=${API_KEY}&limit=${RETURN_QUANTITY}`,
  )
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .catch(error => {
      console.log('ERROR: ', error);
    });
}

/*template grid */
function createGrid({ data = [] }) {
  const items = data;
  const container = document.querySelector('.js-list');
  const source = document.querySelector('#template-card').innerHTML.trim();
  const template = Handlebars.compile(source);
  const markupCards = items.reduce((acc, item) => acc + template(item), '');
  container.innerHTML = markupCards;
}
