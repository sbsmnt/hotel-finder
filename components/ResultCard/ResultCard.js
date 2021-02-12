import Image from 'next/image';
import { useRouter } from 'next/router';
import { formatPrice } from '../../helpers/currencyHelper';
import { showStarRate } from '../../helpers/common';
import styles from './ResultCard.module.scss';

const ResultCard = ({ offerData }) => {
	const router = useRouter();

	const roomType = offerData.type.replace('_', ' ').toLowerCase();

	const handleOfferDetails = () => {
		router.push({
			pathname: '/offer-details/' + offerData.id,
		});
	};

	return (
		<div className={styles['result-card']} onClick={handleOfferDetails}>
			<div className={styles['result-card__details']}>
				<div className={styles['result-card__title']}>
					<h4>{offerData.hotelName}</h4>
				</div>
				<div className={styles['result-card__stars']}>
					<div>{offerData.rating && showStarRate(offerData.rating)}</div>
				</div>
				<div className={styles['result-card__body']}>
					<div className={styles['result-card__room-type']}>
						<span>{roomType}</span> |
						<div className={styles['result-card__guests']}>
							<span className={styles['result-card__guests-icon']}>
								<Image src="/img/icons/icon-users.svg" width={22} height={22} />
							</span>
							{offerData.guests} Guests
						</div>
					</div>

					<div className={styles['result-card__desc']}>
						<p>{offerData.roomDescription && offerData.roomDescription}</p>
					</div>
					<div className={styles['result-card__more']}>
						<button className={`${styles['result-card__btn']} btn--red`}>
							See Details
						</button>
					</div>
				</div>
			</div>
			<div className={styles['result-card__media']}>
				<div className={styles['result-card__media-wrap']}>
					<div className={styles['result-card__image-wrap']}>
						{offerData.image && (
							<Image
								className={styles['result-card__image']}
								src={offerData.image}
								width={200}
								height={200}
							/>
						)}
					</div>
					<div className={styles['result-card__price']}>
						{formatPrice(offerData.price, offerData.currency)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultCard;
