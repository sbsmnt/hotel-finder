const axios = require('axios');

const baseUrl = 'http://dataservice.accuweather.com/';
const apikey = process.env.ACCUWEATHER_API_KEY;

exports.weekForecast = (req, res, next) => {
	if (res.locals.weatherForecast) {
		next();
		return;
	}

	if (!res.locals.weatherLocation) {
		next();
		return;
	}

	// const locationCode = res.locals.weatherLocation.key;
	const { city, country, locationCode } = res.locals.weatherLocation;
	const date = new Date().toLocaleDateString('en-gb');
	const key = `apikey=${apikey}`;
	const metic = `&metric=true`;
	const requestUrl = `${baseUrl}forecasts/v1/daily/5day/${locationCode}?${key}${metic}`;

	const config = {
		method: 'get',
		url: requestUrl,
	};

	axios(config)
		.then((result) => {
			if (result.data) {
				res.locals.weatherForecast = {
					Date: date,
					Country: { city, code: country },
					Forecast: [...result.data.DailyForecasts],
				};
				res.locals.apiSearch = true;
			} else {
				res.locals.weatherForecast = {Forecast:[]};
			}

			next();
		})
		.catch((error) => {
			res.locals.weatherError = error;
			next();
			console.log(error);
		});
};

exports.locationCode = (req, res, next) => {
	if (res.locals.weatherForecast) {
		next();
		return;
	}

	if (!req.query.city || !req.query.countryCode) {
		next();
		return;
	}

	const countryCode = req.query.countryCode;
	const locationString = encodeURIComponent(req.query.city);

	const key = `apikey=${apikey}`;
	const requestUrl = `${baseUrl}locations/v1/cities/search?${key}&q=${locationString}`;

	var config = {
		method: 'get',
		url: requestUrl,
		headers: {},
	};

	axios(config)
		.then((results) => {
			const city =
				results.data &&
				results.data.find((result) => result.Country.ID === countryCode);

			res.locals.weatherLocation = {
				locationCode: city.Key,
				city: locationString,
				country: countryCode,
			};
			next();
		})
		.catch((error) => {
			res.locals.weatherError = error;
			next();
			console.log(error);
		});
};
