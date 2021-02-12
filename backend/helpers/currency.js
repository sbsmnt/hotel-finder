
exports.currencyConverter = (value, rates={}) => {
	if (rates.currencyConversionLookupRates) {
		const conversion = rates.currencyConversionLookupRates;
		const rateKeys = Object.keys(conversion);
		const floatValue = parseFloat(value);
		let finalValue;

		if (rateKeys.length) {
			rateKeys.forEach((key) => {
				const convertedValue = conversion[key].rate * floatValue;
				finalValue = convertedValue.toFixed(
					conversion[key].targetDecimalPlaces
				);
			});
		}

		return parseFloat(finalValue);
	}
	return parseFloat(value);
};