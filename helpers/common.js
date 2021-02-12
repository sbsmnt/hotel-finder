import Image from 'next/image';
import { nanoid } from 'nanoid';

export const showStarRate = (rating) => {
	const size = parseInt(rating);
	return [...Array(size)].map((item, i) => (
		<Image
			key={nanoid()}
			src="/img/icons/icon-star.svg"
			width={20}
			height={20}
			alt="star"
		/>
	));
};

export const amenitiesIcons = (categories, className = '') => {
	return categories.map((category) => {
		let icon = {
			iconSource: '',
			iconAlt: category.toLowerCase(),
		};

		switch (true) {
			case category.includes('AIR_CONDITIONING'):
				icon = { iconSource: '/img/icons/icon-ac.svg' };
				break;
			case category.includes('BABY-SITTING'):
				icon = { iconSource: '/img/icons/icon-baby.svg' };
				break;
			case category.includes('BEACH'):
				icon = { iconSource: '/img/icons/icon-parasol.svg' };
				break;
			case category.includes('BAR'):
				icon = { iconSource: '/img/icons/icon-glass-cocktail.svg' };
				break;
			case category.includes('MINIBAR'):
				icon = { iconSource: '/img/icons/icon-minibar.svg' };
				break;
			case category.includes('JACUZZI'):
				icon = { iconSource: '/img/icons/icon-jacuzzi.svg' };
				break;
			case category.includes('SAUNA'):
				icon = { iconSource: '/img/icons/icon-sauna.svg' };
				break;
			case category.includes('TELEVISION'):
				icon = { iconSource: '/img/icons/icon-device-tv.svg' };
				break;
			case category.includes('DISABLED'):
				icon = { iconSource: '/img/icons/icon-wheelchair.svg' };
				break;
			case category.includes('WIFI'):
				icon = { iconSource: '/img/icons/icon-wifi.svg' };
				break;
			case category.includes('PETS'):
				icon = { iconSource: '/img/icons/icon-paw.svg' };
				break;
			case category.includes('PARKING'):
				icon = { iconSource: '/img/icons/icon-sign-parking.svg' };
				break;
			case category.includes('PHONE'):
				icon = { iconSource: '/img/icons/icon-phone.svg' };
				break;
			case category.includes('NON_SMOKING'):
				icon = { iconSource: '/img/icons/icon-no-smoking.svg' };
				break;
			default:
				break;
		}
		return (
			icon.iconSource && (
				<span key={nanoid()} className={className}>
					<Image
						src={icon.iconSource}
						width={27}
						height={27}
						alt={icon.iconAlt}
					/>
					<span>{category.split('_').join(' ').toLowerCase()}</span>
				</span>
			)
		);
	});
};
