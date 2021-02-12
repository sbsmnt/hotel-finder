import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header>
			<nav className={styles['top-bar']}>
				<div>
					<div className={styles['top-bar__logo']}>
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
				</div>

				<div className={styles['top-bar__menu']}>
					<div className={styles['top-bar__menu-btn--coll']}>
						<Image
							src="/img/icons/icon-mix-burguer_anchor.svg"
							width={40}
							height={40}
							alt="menu"
						/>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
