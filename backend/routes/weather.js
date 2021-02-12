const express = require('express');
const router = express.Router();
const { locationCode, weekForecast } = require('../middleware/weather');
const { saveWeather } = require('../controllers/weather');
const { dbWeatherSearch } = require('../middleware/checkDb');

router.get(
	'/week-forecast',
	dbWeatherSearch,
	locationCode,
	weekForecast,
	(req, res, next) => {
		if (res.locals.weatherError) {
			res.status(400).json({ error: res.locals.weatherError });
			return;
		}

		// save search to DB in case AccuWeather API was called
		if (res.locals.apiSearch) {
			saveWeather(res.locals.weatherForecast);
		}

		const results = res.locals.weatherForecast.Forecast || [];
		res.status(200).json(results);
	}
);

module.exports = router;
