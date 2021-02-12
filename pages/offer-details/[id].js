import React from 'react';
import Head from 'next/head';
import { showStarRate, amenitiesIcons } from '../../helpers/common';
import { formatPrice } from '../../helpers/currencyHelper';
import styles from '../../styles/OfferDetails.module.scss';
import Image from 'next/image';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getStaticPaths() {
	const resp = await fetch(`${apiBaseUrl}/hotel/offers`);
	const offers = await resp.json();
	const paths = offers.map((offer) => ({
		params: { id: offer.id },
	}));

	return {
		paths: paths,
		fallback: false,
	};
}

export const getStaticProps = async ({ params }) => {
	// Get Offer to pass as props
	const resp = await fetch(`${apiBaseUrl}/hotel/offer/${params.id}`);
	const offer = await resp.json();
	return {
		props: { offer },
	};
};

const OfferDetails = ({ offer }) => {
	return (
		<>
			{offer && (
				<Head>
					<title>{offer.name} | Hotel Finder</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta property="og:title" content={offer.name} key="title" />
					<meta property="og:image" content={offer.image} key={offer.name} />
					<link rel="icon" href="/favicon.ico" />
				</Head>
			)}

			{offer && (
				<section className={styles.details}>
					<div className={styles.details__top}>
						<div className={styles.details__title}>
							<h1 className={styles.details__name}>{offer.hotelName}</h1>
							<div className={styles.details__stars}>
								{showStarRate(offer.rating)}
							</div>
							<div className={styles.details__address}>
								<p>{`${offer.address.lines.join(' ')}, 
                ${offer.address.postalCode} ${offer.address.cityName}, 
                ${offer.address.countryCode}`}</p>
							</div>
							<div className={styles.details__address}>
								From <strong>{offer.checkIn}</strong> to{' '}
								<strong>{offer.checkOut}</strong>
							</div>
						</div>
						<div className={styles.details__price}>
							<div className={styles.details__value}>
								{formatPrice(offer.price, offer.currency)}
							</div>
							<button className={`${styles['details__book-btn']} btn--red`}>
								Book Now
							</button>
						</div>
					</div>

					<div className={`${styles.details__offer} card`}>
						<div className={styles.details__desc}>
							<h3>Details</h3>
							<div className={styles['details__room-items']}>
								<div className={styles.details__beds}>
									<Image
										className=""
										src={'/img/icons/icon-bed.svg'}
										width={27}
										height={27}
										alt="bed"
									/>
									<span>{offer.beds}</span> Beds
								</div>

								<div className={styles.details__guests}>
									<Image
										className=""
										src={'/img/icons/icon-user.svg'}
										width={27}
										height={27}
										alt="guests"
									/>
									<span>{offer.guests}</span>Guests
								</div>
							</div>

							<div className={styles.details__text}>
								<p>
									<strong>{offer.roomDescription}</strong>
								</p>
							</div>
							<div className={styles.details__text}>
								<p>{offer.hotelDescription}</p>
							</div>
							<div className={styles.details__amenities}>
								{amenitiesIcons(offer.amenities, styles['details__am-icon'])}
							</div>
						</div>
						<div className={styles.details__media}>
							<Image
								className={styles.details__img}
								src={offer.image}
								width={300}
								height={300}
								alt={offer.offerName}
							/>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default OfferDetails;
