import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates';

export const SearchDateRangePicker = ({
	styles,
	startDate,
	onStartDateChange,
	endDate,
	onEndDateChange,
	autoFocus,
}) => {
	const start = startDate ? new Date(startDate) : undefined;
	const end = endDate ? new Date(endDate) : undefined;

	const formatDate = (date) => {
		return format(new Date(date), 'dd MMM yyyy', { locale: enGB });
	};

	return (
		<DateRangePicker
			startDate={start}
			endDate={end}
			onStartDateChange={onStartDateChange}
			onEndDateChange={onEndDateChange}
			locale={enGB}>
			{({ startDateInputProps, endDateInputProps, focus }) => (
				<>
					<img
						className={styles['main-search__input-icon']}
						src="/img/icons/icon-calendar.svg"
						alt="checkin icon"
					/>
					<input
						className={styles['main-search__input']}
						{...startDateInputProps}
						placeholder="CheckIn - CheckOut"
						autoFocus={autoFocus}
						value={
							startDate && endDate
								? `${formatDate(startDate)} - ${formatDate(endDate)}`
								: ''
						}
					/>
					<input
						className={styles['main-search__input--hidden']}
						{...endDateInputProps}
					/>
				</>
			)}
		</DateRangePicker>
	);
};
