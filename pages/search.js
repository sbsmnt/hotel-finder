import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ResultList from '../components/ResultList/ResultList';
import SearchBar from '../components/SearchBar/SearchBar';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import Loading from '../components/Loading/Loading';
import styles from '../styles/Search.module.scss';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
export async function getServerSideProps(context) {
	const location = context.query.location || '';
	const cityCode = context.query.cityCode || '';
	const countryCode = context.query.countryCode || '';
	const focusDate = context.query.focusDate || false;
	const start = context.query.start || '';
	const end = context.query.end || '';
	const guests = context.query.guests || '';

	const searchParams = new URLSearchParams({
		cityCode,
		checkInDate: start,
		checkOutDate: end,
		guests,
	});

	const resp = await fetch(
		`${apiBaseUrl}/hotel/search?${searchParams.toString()}`
	);
	const initialResults = await resp.json();

	return {
		props: {
			initialResults,
			location,
			cityCode,
			countryCode,
			focusDate,
			start,
			end,
			guests,
		},
	};
}

const Search = ({
	initialResults,
	location,
	cityCode,
	countryCode,
	focusDate,
	start,
	end,
	guests,
}) => {
	const router = useRouter();
	const [results, setResults] = useState(initialResults);
	const [isLoading, setIsLoading] = useState(false);
	const [currentLocation, setCurrentLocation] = useState({
		location,
		countryCode,
	});

	const handleSearchOffers = (
		location,
		cityCode,
		countryCode,
		startDate = '',
		endDate = '',
		guests = 1
	) => {
		setIsLoading(true);
		const searchParams = new URLSearchParams({
			cityCode,
			checkInDate: startDate,
			checkOutDate: endDate,
			guests,
		});

		try {
			fetch(`${apiBaseUrl}/hotel/search?${searchParams.toString()}`)
				.then((resp) => resp.json())
				.then((data) => {
					data && setResults(data);

					setCurrentLocation({
						location,
						countryCode,
					});

					const newUrl = new URLSearchParams({
						location,
						cityCode,
						countryCode,
						start: startDate,
						end: endDate,
						guests,
					});

					router.push(`/search?${newUrl.toString()}`, undefined, {
						shallow: true,
					});

					setIsLoading(false);
				})
				.catch((error) => {
					setResults([]);
					setIsLoading(false);
					console.log(error);
				});
		} catch (error) {
			setResults([]);
			setIsLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Search Results | Hotel Finder</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta property="og:title" content="Hotel Finder" key="title" />
				<meta
					name="og:description"
					content="Find your next hotel at the best prices!"
				/>
				<meta property="og:image" content="/img/logo-tui.svg" key="title" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className={styles['search-results']}>
				<SearchBar
					searchLocation={location}
					locationCode={cityCode}
					country={countryCode}
					checkIn={start}
					checkOut={end}
					searchGuests={guests}
					focusDate={focusDate}
					searchHotel={handleSearchOffers}
				/>
			</section>

			<section className={styles['result-list']}>
				{location && (
					<WeatherCard
						location={currentLocation.location}
						country={currentLocation.countryCode}
					/>
				)}
				<ResultList location={location} results={results} />
			</section>
			{isLoading && <Loading />}
		</>
	);
};

export default Search;
