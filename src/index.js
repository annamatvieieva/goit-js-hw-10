import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const name = input.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (!name) {
    console.log('пустое поле');
  } else {
    fetchCountries(name)
      .then(response => {
        console.log(response);
        createCardList(response);
      })
      .catch(error => {
        console.log('error', error.message);
        Notify.failure('Oops, there is no country with that name');
      })
  }
}
function createCardList(list) {
  if (list.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (list.length == 1) {
    const cardInfo = createCardInfo(list[0]);
    countryInfo.innerHTML = cardInfo;
  } else {
    const markup = list.map(item => createListItem(item)).join('');
    countryList.innerHTML = markup;
  }
}
function createListItem(item) {
  return `<li class='country-item'>
				<div class="img-holder"><img src='${item.flags.svg}' alt='${item.name.official}' height='20'/></div>
				<h2 class='country-title'>${item.name.official}</h2>
			</li>`;
}
function createCardInfo(item) {
  let langs = [];
  for (let lang in item.languages) {
    langs.push(item.languages[lang]);
  }
  return `<div class="img-holder">
			<img src='${item.flags.svg}' alt='${item.name.official}'height='20'/>
			<h2 class='country-title'>${item.name.official}</h2>
		</div>
		<p><b>Capital</b>: ${item.capital}</p>
		<p><b>Population</b>: ${item.population}</p>
		<p><b>Languages</b>: ${langs.join(', ')}</p>`;
}
