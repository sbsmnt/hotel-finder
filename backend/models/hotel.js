const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	cityCode: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: false,
	},
	beds: {
		type: Number,
		required: false,
	},
	guests: {
		type: Number,
		required: true,
	},
	checkIn: {
		type: String,
		required: false,
	},
	checkOut: {
		type: String,
		required: false,
	},
	roomDescription: {
		type: String,
		required: false,
	},
	hotelId: {
		type: String,
		required: true,
	},
	hotelName: {
		type: String,
		required: true,
	},
	rating: {
		type: String,
		required: true,
	},
	address: {
		type: Object,
		required: true,
	},
	amenities: {
		type: [String],
		required: false,
	},
	hotelDescription: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model('Hotel', hotelSchema);
