import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import styles from './Filters.module.scss';
import { nanoid } from 'nanoid';

const priceRanges = [
	{ id: nanoid(), label: '1 - 50', value: '1-50' },
	{ id: nanoid(), label: '50 - 100', value: '50-100' },
	{ id: nanoid(), label: '100 - 150', value: '100-150' },
	{ id: nanoid(), label: '150 - 200', value: '150-200' },
	{ id: nanoid(), label: 'more than 200', value: '200+' },
];

const ratingRanges = [
	{ id: nanoid(), label: '1', value: '1' },
	{ id: nanoid(), label: '2', value: '2' },
	{ id: nanoid(), label: '3', value: '3' },
	{ id: nanoid(), label: '4', value: '4' },
	{ id: nanoid(), label: '5', value: '5' },
];

const Filters = ({ handlePrice, handleRating, handleClear }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [priceFilter, setPriceFilter] = useState([]);
	const [ratingFilter, setRatingFilter] = useState([]);

	const checkFilter = (checked, value, filterArray, setFilter) => {
		if (checked && !filterArray.includes(value)) {
			setFilter([...filterArray, value]);
		}

		if (!checked && filterArray.includes(value)) {
			setFilter(filterArray.filter((filterValue) => filterValue !== value));
		}
	};

	const handlePriceFilter = (e) => {
		const selectedPrice = e.target.value;
		checkFilter(e.target.checked, selectedPrice, priceFilter, setPriceFilter);
	};

	const handleRatingFilter = (e) => {
		const selectedRating = e.target.value;
		checkFilter(
			e.target.checked,
			selectedRating,
			ratingFilter,
			setRatingFilter
		);
	};

	const handleSubmitFilter = () => {
		handlePrice(priceFilter);
		handleRating(ratingFilter);
		setIsOpen(false);
	};

	const handleClearFilters = () => {
		setPriceFilter([]);
		setRatingFilter([]);
		handleClear();
	};

	return (
		<div className={styles['list-filters']}>
			<div className={styles['list-filters__sm']}>
				<button
					className={styles['list-filters__btn']}
					onClick={() => setIsOpen(!isOpen)}>
					{!isOpen ? 'Filter Results' : 'Close'}
				</button>
			</div>
			<div
				className={
					styles['list-filters__collapse' + (isOpen ? '--off' : '--on')]
				}>
				<h4>Filter by:</h4>
				<div className={styles['list-filters__price']}>
					<h5>Price €</h5>
					<div className={styles['price-range']}>
						{priceRanges &&
							priceRanges.map((price) => (
								<label key={price.id} className={styles['price-range__label']}>
									<span className={styles['label-body']}>{price.label}</span>

									<div className={styles['checkbox__container']}>
										<input
											type="checkbox"
											value={price.value}
											checked={priceFilter.includes(price.value)}
											onChange={handlePriceFilter}
											className={styles['checkbox__input']}
										/>
										<span className={styles['checkbox__checkmark']}></span>
									</div>
								</label>
							))}
					</div>
				</div>
				<div className={styles['list-filters__rating']}>
					<h5>
						Rating
						<span className={styles['list-filters__icon']}>
							<Image
								src="/img/icons/icon-star.svg"
								width={20}
								height={20}
								alt="star"
							/>
						</span>
					</h5>
					<div className="rating-range">
						{ratingRanges &&
							ratingRanges.map((rating) => (
								<label
									key={rating.id}
									className={styles['rating-range__label']}>
									<span className={styles['label-body']}>{rating.label}</span>
									<div className={styles['checkbox__container']}>
										<input
											type="checkbox"
											className={styles['checkbox__input']}
											value={rating.value}
											checked={ratingFilter.includes(rating.value)}
											onChange={handleRatingFilter}
										/>
										<span className={styles['checkbox__checkmark']}></span>
									</div>
								</label>
							))}
					</div>
				</div>
				<div className={styles['list-filters__submit']}>
					<button
						className={styles['list-filters__btn']}
						onClick={handleSubmitFilter}>
						Filter
					</button>
					<button
						className={`${styles['list-filters__btn']} ${styles['list-filters__btn--clear']}`}
						onClick={handleClearFilters}>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
};

export default Filters;
