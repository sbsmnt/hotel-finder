import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import styles from './SearchBar.module.scss';
import {
	SearchDateRangePicker,
	InitialDateInput,
} from '../SearchDateRangePicker';

const locationList = [
	{ id: 1, name: 'Madrid', value: 'MAD', country: 'ES' },
	{ id: 2, name: 'Barcelona', value: 'BCN', country: 'ES' },
	{ id: 3, name: 'Lisbon', value: 'LIS', country: 'PT' },
	{ id: 4, name: 'Porto', value: 'OPO', country: 'PT' },
	{ id: 5, name: 'Roma', value: 'RMA', country: 'IT' },
	{ id: 6, name: 'Venice', value: 'VCE', country: 'IT' },
	{ id: 7, name: 'Rio de Janeiro', value: 'RIO', country: 'BR' },
	{ id: 8, name: 'São Paulo', value: 'SAO', country: 'BR' },
];

const SearchBar = ({
	searchLocation,
	locationCode,
	country,
	focusDate,
	checkIn,
	checkOut,
	searchGuests,
	searchHotel,
}) => {
	const [location, setLocation] = useState(searchLocation);
	const [cityCode, setCityCode] = useState(locationCode);
	const [countryCode, setCountryCode] = useState(country);
	const [guests, setGuests] = useState(searchGuests);
	const [startDate, setStartDate] = useState(checkIn);
	const [endDate, setEndDate] = useState(checkOut);
	const [dateFocus, setDateFocus] = useState(focusDate);
	const [showDateInput, setShowDateInput] = useState(false);

	const handleChangeLocation = (string) => {
		if (string.name && string.value && string.country) {
			setLocation(string.name);
			setCityCode(string.value);
			setCountryCode(string.country);
		}
	};

	const handleChangeGuests = (e) => {
		setGuests(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		if (cityCode && startDate && endDate && guests) {
			const checkIn = format(new Date(startDate), 'yyyy-MM-dd');
			const checkOut = format(new Date(endDate), 'yyyy-MM-dd');

			searchHotel(location, cityCode, countryCode, checkIn, checkOut, guests);
			return;
		}
	};

	useEffect(() => {
		focusDate && setDateFocus(true);

		// Used to avoid Warning: useLayoutEffect when
		// using SearchDateRangePicker and react-nice-dates module
		setShowDateInput(true);
	}, []);

	return (
		<div className={styles.search__bar}>
			<form className={styles['main-search']} onSubmit={handleSearchSubmit}>
				<div className={styles['main-search__local']}>
					<img
						className={styles['main-search__input-icon']}
						src="/img/icons/icon-search.svg"
						alt="search icon"
					/>
					<div className={styles['main-search__local--component']}>
						<ReactSearchAutocomplete
							className={styles['main-search__local-input']}
							items={locationList}
							placeholder={location ? location : "What's your destination?"}
							showIcon={false}
							maxResults={4}
							onSelect={handleChangeLocation}
							styling={{
								height: '43px',
								borderRadius: '5px',
								border: 'none',
								boxShadow: 'none',
							}}
						/>
					</div>
				</div>
				<div className={styles['main-search__in']}>
					{!showDateInput && <InitialDateInput styles={styles} />}
					{showDateInput && (
						<SearchDateRangePicker
							styles={styles}
							autoFocus={dateFocus}
							startDate={startDate}
							endDate={endDate}
							onStartDateChange={setStartDate}
							onEndDateChange={setEndDate}
						/>
					)}
				</div>
				<div className={styles['main-search__guests']}>
					<img
						className={styles['main-search__input-icon']}
						src="/img/icons/icon-users.svg"
						alt="Guests icon"
					/>
					<input
						className={styles['main-search__input']}
						type="number"
						min={1}
						max={10}
						placeholder="Guests"
						value={guests ? guests : ''}
						onChange={handleChangeGuests}
					/>
				</div>
				<button className={`${styles['main-search__submit']} btn--red`}>
					<img
						className={styles['main-search__submit-icon']}
						src="/img/icons/icon-search-white.svg"
						alt="Search icon"
					/>
					<span>Search</span>
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
