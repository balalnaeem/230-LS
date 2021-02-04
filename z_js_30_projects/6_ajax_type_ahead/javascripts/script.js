const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities = data);

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  let matches = findMatches(this.value, cities);
  let html = matches.map(place => {
    const regex = new RegExp(this.value, 'gi');
    let cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    let stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${place.population}</span>
    </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
