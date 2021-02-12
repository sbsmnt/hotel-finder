import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const MainLayout = ({ children }) => {
	return (
		<div>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
