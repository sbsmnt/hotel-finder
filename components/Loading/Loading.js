import Image from 'next/image';
import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
	return (
		<div className={styles.loader}>
			<div className={styles.loader__loading}>
				<Image src="/img/loading.svg" width={70} height={70} />
			</div>
		</div>
	);
};

export default Loading;
