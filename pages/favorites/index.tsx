import { NextPage } from 'next';
import Head from 'next/head';
import Favorites from '../../components/Favorites/Favorites';

const FavoritesPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Favorites/>
		</>
	);
};

export default FavoritesPage;
