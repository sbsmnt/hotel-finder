import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import SearchBar from '../components/SearchBar/SearchBar';
import Destinations from '../components/Destinations/Destinations';
import Loading from '../components/Loading/Loading';
import styles from '../styles/Home.module.scss';

export default function Home() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const countryList = [
		{
			id: 123,
			name: 'Portugal',
			cities: [
				{ id: nanoid(), name: 'Lisbon', value: 'LIS', country: 'PT' },
				{ id: nanoid(), name: 'Porto', value: 'OPO', country: 'PT' },
			],
			img: '/img/destinations/lisbon2.jpg',
		},
		{
			id: 124,
			name: 'Spain',
			cities: [
				{ id: nanoid(), name: 'Madrid', value: 'MAD', country: 'ES' },
				{ id: nanoid(), name: 'Barcelona', value: 'BCN', country: 'ES' },
			],
			img: '/img/destinations/madrid1.jpg',
		},
		{
			id: 125,
			name: 'Italy',
			cities: [
				{ id: nanoid(), name: 'Roma', value: 'RMA', country: 'IT' },
				{ id: nanoid(), name: 'Venice', value: 'VCE', country: 'IT' },
			],
			img: '/img/destinations/veneza1.jpg',
		},
		{
			id: 126,
			name: 'Brazil',
			cities: [
				{ id: nanoid(), name: 'Rio de Janeiro', value: 'RIO', country: 'BR' },
				{ id: nanoid(), name: 'São Paulo', value: 'SAO', country: 'BR' },
			],
			img: '/img/destinations/rio1.jpg',
		},
	];

	const handleSearchOffers = (
		location,
		cityCode,
		countryCode,
		startDate = '',
		endDate = '',
		guests = 1
	) => {
		setIsLoading(true);

		router.push({
			pathname: '/search',
			query: {
				location,
				cityCode,
				countryCode,
				start: startDate,
				end: endDate,
				guests,
			},
		});
	};

	return (
		<>
			<Head>
				<title>Hotel Finder</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta property="og:title" content="Hotel Finder" key="title" />
				<meta
					name="og:description"
					content="Find your next hotel at the best prices!"
				/>
				<meta property="og:image" content="/img/logo-tui.svg" key="title" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className={styles.search}>
				<div className={styles.search__title}>
					<h1>Find your next Hotel</h1>
					<h3>At the best prices!</h3>
				</div>
				<SearchBar searchHotel={handleSearchOffers} />
			</section>
			<section className={styles.destinations}>
				<div className={styles.destinations__title}>
					<h3>Find the best hotel by destination</h3>
				</div>
				<Destinations countryList={countryList} />
			</section>
			{isLoading && <Loading />}
		</>
	);
}
