const Hotel = require('../models/hotel');

exports.saveSearch = (searchResults) => {
	searchResults.forEach((result) => {
		const hotel = new Hotel(result);

		hotel
			.save()
			.then((saved) => {
				console.log('hotel search saved');
			})
			.catch((error) => {
				console.error(error);
			});
	});
};

exports.getOffers = async (
	cityCode,
	ratings = [],
	checkIn = '',
	checkOut = '',
	guests = '',
	priceRange = ''
) => {
	const searchParams = {
		cityCode: cityCode,
	};

	if (ratings.length) searchParams.rating = { $in: ratings };
	if (checkIn) searchParams.checkIn = checkIn;
	if (checkOut) searchParams.checkOut = checkOut;
	if (guests) searchParams.guests = guests;
	if (priceRange) {
		const ranges = priceRange.split('-');
		const upper = parseInt(ranges.pop());
		const lower = parseInt(ranges.shift());
		searchParams.price = { $gte: lower, $lte: upper };
	}
	// console.log(searchParams);

	const docs = await Hotel.find(searchParams).exec();
	return docs;
};

exports.getOffer = async (offerId) => {
	const offer = await Hotel.findOne({ id: offerId });
	return offer;
};

exports.getAllOffers = async () => {
	const offer = await Hotel.find({}, 'id').exec();
	return offer;
};
