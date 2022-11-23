import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';


const DEBOUNCE_DELAY = 300;
const search = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

search.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const nameCountry = e.target.value.trim();
    if (!nameCountry) {
        clearMarkup(countryList);
        clearMarkup(countryInfo);
        return;
    }
    fetchCountries(nameCountry)
        .then(json => {
            console.log(json);
            if (data.length > 10) {
                clearMarkup(countryList);
                clearMarkup(countryInfo);
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            } else if (data.length > 1) {
                fetchCountries(nameCountry).then(countries => {
                    renderCountryList(data);
                    clearMarkup(countryInfo)
                });
            } else if (data.length === 1) {
                fetchCountries(nameCountry).then(countries => {
                    renderCountryInfo(data);
                    clearMarkup(countryList)
                })

                    .catch(onCountryError);
            };
        });

}
function renderCountryList(countries) {
    const markup = countries
        .map(
            country => `<li class="list">
        <img src = "${country.flags.svg}" alt = "A flag" width="40px">
        <span>${country.name.official}</span>
    </li >`
        )
        .join('');
    countryList.innerHTML = markup;
}

function renderCountryInfo(countries) {
    const markup = countries
        .map(
            country => `<img src="${country.flags.svg}" alt="A flag" width="40px"></img><span> ${country.name.official}</span>
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Popuation:</b> ${country.population}</p>
      <p><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>`
        )
        .join('');
    countryInfo.innerHTML = markup;
}

function onCountryError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

function clearMarkup(section) {
    section.innerHTML = '';
}