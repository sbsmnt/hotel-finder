const express = require('express');
const router = express.Router();
const { hotelSearch } = require('../middleware/amadeus');
const { dbHotelSearch } = require('../middleware/checkDb');
const { saveSearch, getOffer, getAllOffers } = require('../controllers/hotel');

router.get('/search', dbHotelSearch, hotelSearch, (req, res, next) => {
	if (res.locals.hotelError) {
		res.status(400).json({ error: res.locals.hotelError });
		return;
	}

	// Save to only database if the results come from amadeus API
	if (res.locals.apiSearch && res.locals.hotelResults.length) {
		saveSearch(res.locals.hotelResults);
	}

	const results = res.locals.hotelResults || [];
	res.status(200).json(results);
});

router.get('/offer/:id', async (req, res, next) => {
	console.log('offer id', req.params.id);
	if (req.params.id) {
		const doc = await getOffer(req.params.id);
		const response = doc ? doc : {};
		res.status(200).json(response);
	} else {
		res.status(200).json({});
	}
});

router.get('/offers', async (req, res, next) => {
	const offers = await getAllOffers();
	const response = offers ? offers : [];
	res.status(200).json(response);
});

module.exports = router;
