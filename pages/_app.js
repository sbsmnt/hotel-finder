import MainLayout from '../components/MainLayout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
	return (
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
	);
}

export default MyApp;
