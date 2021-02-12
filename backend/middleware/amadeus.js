const Amadeus = require('amadeus');
const hotelController = require('../controllers/hotel');
const {currencyConverter} = require('../helpers/currency')

// Put credencials in .env file
const amadeus = new Amadeus({
	clientId: process.env.AMADEUS_CLIENT_ID,
	clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

exports.hotelSearch = (req, res, next) => {
	if (res.locals.hotelResults) {
		next();
		return;
	}

	if (Object.keys(req.query).length) {
		const { query } = req;
		const searchParams = {
			cityCode: query.cityCode,
			checkInDate: query.checkInDate,
			checkOutDate: query.checkOutDate,
			priceRange: query.priceRange || '',
			currency: query.currency || 'EUR',
			adults: query.guests || 2,
			radius: query.radius || 10,
			ratings: query.ratings,
			radiusUnit: query.radiusUnit || 'KM',
			bestRateOnly: query.bestRateOnly || true,
			paymentPolicy: query.paymentPolicy || 'NONE',
			includeClosed: query.includeClosed || false,
			view: query.view || 'FULL',
			sort: query.sort || 'NONE',
		};

		amadeus.shopping.hotelOffers
			.get(searchParams)
			.then((results) => {
				const conversionRates = results.result.dictionaries || {};

				const searchResultData =
					results.data.length &&
					results.data.map((result) => {
						const offersList = result.offers.map((offer) => {
							return {
								id: offer.id,
								cityCode: query.cityCode,
								price: currencyConverter(offer.price.total, conversionRates) || 0.0,
								currency: searchParams.currency,
								type: offer.room.typeEstimated.category,
								beds: offer.room.typeEstimated.beds || 0,
								guests: offer.guests.adults || 2,
								checkIn: offer.checkInDate || '',
								checkOut: offer.checkOutDate || '',
								roomDescription: offer.room.description.text,
								hotelId: result.hotel.hotelId,
								hotelName: result.hotel.name,
								rating: result.hotel.rating || '0',
								address: result.hotel.address,
								amenities: result.hotel.amenities || [],
								hotelDescription: result.hotel.description
									? result.hotel.description.text
									: '',
								image: result.hotel.media ? result.hotel.media[0].uri : '',
							};
						});

						return offersList[0];
					});

				res.locals.hotelResults = searchResultData || [];
				res.locals.apiSearch = true;
				next();
			})
			.catch((error) => {
				res.locals.hotelError = error.description;
				next();
			});
	} else {
		next();
	}
};
