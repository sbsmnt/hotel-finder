import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import styles from './WeatherCard.module.scss';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const WeatherCard = ({ location, country }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [forecast, setForecast] = useState([]);

	useEffect(() => {
		fetch(
			`${apiBaseUrl}/weather/week-forecast?city=${location}&countryCode=${country}`
		)
			.then((resp) => resp.json())
			.then((data) => {
				if (!data.error) {
					setForecast(data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [location]);

	return (
		<div
			className={`${styles['weather-info']} card`}
			onClick={() => setIsOpen(!isOpen)}>
			<div className={styles['weather-info__title']}>
				<Image
					src="/img/icons/icon-cloud-sun.svg"
					width={50}
					height={50}
					alt="Weather"
				/>
				<h5 className={styles['weather-info__title--text']}>
					{`Weather Forecast ${location}`}
				</h5>
			</div>
			{location && country && (
				<div
					className={
						styles['weather-info__forecast' + (isOpen ? '--open' : '--close')]
					}>
					{forecast &&
						forecast.map((weather) => (
							<div
								key={weather.EpochDate}
								className={styles['weather-info__day']}>
								<div className={styles['weather-info__weather-icon']}>
									<Image
										src={`/img/icons/weather/${weather.Day.Icon}-s.png`}
										width={64}
										height={38}
										alt="Weather"
									/>
								</div>

								<div>
									<div className={styles['weather-info__phrase']}>
										<h6>{weather.Day.IconPhrase}</h6>
									</div>
									<div className={styles['weather-info__temperature']}>
										<span>Max</span>
										{` ${weather.Temperature.Maximum.Value}° ${weather.Temperature.Maximum.Unit}`}
									</div>
									<div className={styles['weather-info__temperature']}>
										<span>Min</span>
										{` ${weather.Temperature.Minimum.Value}° ${weather.Temperature.Minimum.Unit}`}
									</div>

									<div className={styles['weather-info__date']}>
										{format(new Date(weather.Date), 'dd MMM')}
									</div>
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default WeatherCard;
