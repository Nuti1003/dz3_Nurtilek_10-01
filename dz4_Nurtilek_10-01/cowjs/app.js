let sun = '<i class="bi bi-brightness-high"></i>';
let moon = '<i class="bi bi-moon-fill"></i>';

//https://flagpedia.net/download/api

const _baseURL_Flags = 'https://flagcdn.com/16x12/';

//https://flagcdn.com/16x12/us.png
//https://flagcdn.com/16x12/ru.png
//https://flagcdn.com/16x12/kz.png

const _baseURL_Currency = 'https://v6.exchangerate-api.com/v6/';

const _API_KEY = 'dae898a1a40af6bc3986215a';
//dae898a1a40af6bc3986215a
let url = `${_baseURL_Currency}${_API_KEY}/latest/`; //USD

let country_code = {
	KZT: 'KZ',
	USD: 'US',
	RUB: 'RU',
	TJS: 'TJ',
};


const themeBtn = document.querySelector('#theme-btn');
const link = document.querySelector('#theme');
let isMoon = false;

themeBtn.addEventListener('click', e => {
	isMoon = !isMoon;
	themeBtn.innerHTML = isMoon ? moon : sun;
	if (link.getAttribute('href') === 'style.css') {
		link.href = 'nigth.css'
	} else if (link.getAttribute('href') === 'nigth.css') {
		link.href = 'style.css'
	}
});

const fromSelect = document.querySelector('.from select');
const fromImg = document.querySelector('#fromImg');
const toSelect = document.querySelector('.to select');
const toImg = document.querySelector('#toImg');
const getCurrency = document.querySelector('#getCurrency');
const input = document.querySelector('#input');
const exchangeRate = document.querySelector('.exchange-rate');

const renderCurrency = select => {
	for (let currency in country_code) {
		select.innerHTML += `<option value=${currency}>${currency}</option>`;
	}
};
renderCurrency(fromSelect);
renderCurrency(toSelect);

fromSelect.addEventListener('change', e => {
	let { value: fromCurrency } = e.target;
	for (let code in country_code) {
		if (fromCurrency === code) {
			let cCode = country_code[code];
			getFlagCountry(fromImg, cCode);
		}
	}
});

toSelect.addEventListener('change', e => {
	let { value: toCurrency } = e.target;
	for (let code in country_code) {
		if (toCurrency === code) {
			let cCode = country_code[code];
			getFlagCountry(toImg, cCode);
		}
	}
});

const getFlagCountry = (imgHtml, code) => {
	fetch(`${_baseURL_Flags}${code.toLowerCase()}.png`).then(img => {
		imgHtml.src = img.url;
	});
};

getFlagCountry(fromImg, 'KZ')
getFlagCountry(toImg, 'KZ')

getCurrency.addEventListener('click', () => {
	let fromAmount = input.value;
	fetch(`${url}${fromSelect.value}`)
		.then(response => response.json())
		.then(data => {
			let toCurrency = data.conversion_rates[toSelect.value];
			let result = (fromAmount * toCurrency).toFixed(2);
			exchangeRate.innerHTML = `${fromAmount} ${fromSelect.value} = ${result} ${toSelect.value}`;
		});
});
