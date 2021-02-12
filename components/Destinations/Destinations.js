import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Destinations.module.scss';

const Destinations = ({ countryList }) => {
	const router = useRouter();
	const handleSearchCountry = (cityName, cityCode, countryCode) => {
		router.push({
			pathname: '/search',
			query: {
				location: cityName,
				cityCode: cityCode,
				countryCode: countryCode,
				focusDate: true,
			},
		});
	};

	return (
		<div className={`${styles.destinations__list}`}>
			{countryList &&
				countryList.map((country) => (
					<div key={country.id} className={styles.destinations__item}>
						<div className={`${styles.country__card} card`}>
							<div className={styles.card__img}>
								<Image
									className={styles['card__img--cover']}
									src={country.img}
									width={280}
									height={280}
									alt={country.name}
								/>
							</div>
							<div>
								<h3 className={styles.card__title}>{country.name}</h3>

								{country.cities &&
									country.cities.map((city) => (
										<h4
											className={styles.card__link}
											key={city.id}
											onClick={() =>
												handleSearchCountry(city.name, city.value, city.country)
											}>
											{city.name}
										</h4>
									))}
							</div>
						</div>
					</div>
				))}
		</div>
	);
};

export default Destinations;
