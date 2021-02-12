const mongoose = require('mongoose');

const weatherSchema = mongoose.Schema({
  Date: { type: String},
	Country: {
		city: { type: String, required: true },
		code: { type: String, required: true },
	},
	Forecast: [Object],
});

module.exports = mongoose.model('Weather', weatherSchema);
