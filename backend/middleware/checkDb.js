const { getOffers } = require('../controllers/hotel');
const { getWeather } = require('../controllers/weather');

exports.dbHotelSearch = (req, res, next) => {
	if (Object.keys(req.query).length) {
		const { query } = req;
		const searchParams = {
			cityCode: query.cityCode,
			checkInDate: query.checkInDate,
			checkOutDate: query.checkOutDate,
			priceRange: query.priceRange || '',
			adults: query.guests || 2,
			ratings: query.ratings || ['1', '2', '3', '4', '5'],
		};

		getOffers(
			searchParams.cityCode,
			searchParams.ratings,
			searchParams.checkInDate,
			searchParams.checkOutDate,
			searchParams.adults,
			searchParams.priceRange
		)
			.then((offers) => {
				if (offers && offers.length) {
					res.locals.hotelResults = offers;
				}
				next();
			})
			.catch((error) => {
				console.log('DB hotel search error', error);
				next();
			});
	} else {
		next();
	}
};

exports.dbWeatherSearch = (req, res, next) => {
	if (Object.keys(req.query).length) {
		const { query } = req;
		const date = new Date().toLocaleDateString('en-gb');
		
		
		getWeather(query.city, query.countryCode, date)
		.then((weather) => {
			if (weather) {
				res.locals.weatherForecast = weather;
			}
			next();
		})
		.catch(error =>{
			console.log('DB weather search error', error);
			next();
		});
	}
};
