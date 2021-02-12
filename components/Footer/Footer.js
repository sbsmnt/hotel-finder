import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div>
				<Link href="/">
					<a>
						<Image
							src="/img/logo-tui.svg"
							width={92}
							height={40}
							alt="tui logo"
						/>
					</a>
				</Link>
			</div>
			<div></div>
		</footer>
	);
};

export default Footer;
