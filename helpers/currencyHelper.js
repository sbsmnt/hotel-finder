export const formatPrice = (value, currency) => {
	const userLocale = 'EN-gb';
	const price = new Intl.NumberFormat(userLocale, {
		style: 'currency',
		currency: currency,
	})
		.formatToParts(value)
		.map((val) => val.value)
		.join('');

	return price;
};
