const BASE_URL = 'https://restcountries.com/v3.1';
const field1 = 'name';
const field2 = 'capital';
const field3 = 'population';
const field4 = 'flags';
const field5 = 'languages';


function fetchCountries(name) {
	return fetch(`${BASE_URL}/name/${name}?fields=${field1},${field2},${field3},${field4},${field5}`)
		.then(response => {
			if (response.status == 404) {
				throw new Error('SERVER_ERROR');
			}
			return response.json()
		});
}

export default fetchCountries;