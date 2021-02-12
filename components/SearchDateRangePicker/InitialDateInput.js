import React from 'react';

export const InitialDateInput = ({styles}) => {
	return (
		<>
			<img
				className={styles['main-search__input-icon']}
				src="/img/icons/icon-calendar.svg"
				alt="checkin icon"
			/>
			<input
				className={styles['main-search__input']}
				type="text"
				placeholder="CheckIn - CheckOut"
			/>
		</>
	);
};
