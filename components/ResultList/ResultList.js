import React, { useState } from 'react';
import Filters from '../Filters/Filters';
import ResultCard from '../ResultCard/ResultCard';
import styles from './ResultList.module.scss';

const ResultList = ({ results, location }) => {
	const searchResults = !results.error ? results : [];

	const [order, setOrder] = useState({ type: 'asc', label: 'Lowest First' });
	const [orderBy, setOrderBy] = useState('price');
	const [priceRange, setPriceRange] = useState();
	const [ratingRange, setRatingRange] = useState();

	const handleSortList = () => {
		if (order.type === 'asc') {
			setOrder({ type: 'desc', label: 'Highest First' });
		} else {
			setOrder({ type: 'asc', label: 'Lowest First' });
		}
	};

	const handleSortOptions = (e) => {
		setOrderBy(e.target.value);

		if (e.target.value === 'rating') {
			setOrder({ type: 'desc', label: 'Highest First' });
		}

		if (e.target.value === 'price') {
			setOrder({ type: 'asc', label: 'Lowest First' });
		}
	};

	const sortResults = (results, type, orderBy) => {
		const orderResults = [...results];
		return orderResults.sort((a, b) => {
			if (type === 'asc') return a[orderBy] - b[orderBy];
			if (type === 'desc') return b[orderBy] - a[orderBy];
		});
	};

	const filterResults = (results) => {
		const filterResults = [...results];
		// Price
		const tempFilter = filterResults.filter((result) => {
			if (priceRange && Object.keys(priceRange)) {
				const { price } = result;
				if (priceRange.lowLimit && priceRange.highLimit) {
					return priceRange.lowLimit < price && price < priceRange.highLimit;
				}

				if (priceRange.lowLimit && !priceRange.highLimit) {
					return priceRange.lowLimit < price;
				}
			}
			return true;
		});

		// Rating
		return tempFilter.filter((result) => {
			if (ratingRange && ratingRange.length) {
				return ratingRange.includes(result.rating);
			}
			return true;
		});
	};

	const filterPrice = (range) => {
		let limits = [];
		if (!range.length) {
			setPriceRange({});
			return;
		}

		range.forEach((rangeValue) => {
			const priceRange = rangeValue.split('-');
			priceRange.forEach((price) => {
				limits.push(price);
			});
		});

		const uniqueLimits = [...new Set(limits)];
		if (uniqueLimits.includes('200+')) {
			const finalLimit = uniqueLimits.filter((element) => element !== '200+');
			finalLimit.sort((a, b) => a - b);
			// in case no element is in the first position,
			// then the lower limit of the range is 200
			const lower = [...finalLimit].shift();
			setPriceRange({ lowLimit: lower ? lower : '200' });
			return;
		}
		uniqueLimits.sort((a, b) => a - b);
		setPriceRange({
			lowLimit: [...uniqueLimits].shift(),
			highLimit: [...uniqueLimits].pop(),
		});
	};

	const filterRating = (range) => {
		setRatingRange(range);
	};

	const clearFilters = () => {
		setPriceRange({});
		setRatingRange([]);
	};

	const orderedResults = searchResults
		? sortResults(searchResults, order.type, orderBy)
		: [];

	const filteredResults = orderedResults ? filterResults(orderedResults) : [];

	return (
		<div className="flex-grid flex-grid--lg">
			{(!location || !results.length) && (
				<div className={`${styles['result-list__no-search']} flex-grid__col`}>
					<h4>Ups! No results were found...</h4>
					<h5>Maybe try some other dates</h5>
				</div>
			)}

			{location && filteredResults.length > 0 && (
				<>
					<div className="flex-grid__col flex-grid__col--fixed-width">
						<Filters
							handlePrice={filterPrice}
							handleRating={filterRating}
							handleClear={clearFilters}
						/>
					</div>

					<div className="flex-grid__col">
						<div className={styles['list-options']}>
							<div>
								<strong>Order by </strong>
								<select
									name="order-options"
									className={styles['list-options__list']}
									onChange={handleSortOptions}>
									<option value="price">Price</option>
									<option value="rating">Rating</option>
								</select>
							</div>
							<button
								className={styles['list-options__order']}
								onClick={handleSortList}>
								<img
									className={styles['order-icon']}
									src="/img/icons/icon-sort.svg"
									alt=""
								/>
								<span className={styles['order-label']}>{order.label}</span>
							</button>
						</div>
						<div className={styles['result-list']}>
							{filteredResults &&
								filteredResults.map((result) => (
									<ResultCard key={result.id} offerData={result} />
								))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ResultList;
