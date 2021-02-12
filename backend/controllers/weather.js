const Weather = require('../models/weather');

exports.saveWeather = (weatherData) => {
	const forecast = new Weather(weatherData);
	forecast
		.save()
		.then((saved) => console.log(saved))
		.catch((error) => console.log(error));
};

exports.getWeather = async (city, country, date) => {
	const forecast = await Weather.findOne({Date: date, 'Country.city': city, 'Country.code': country, });
	return forecast;
};
