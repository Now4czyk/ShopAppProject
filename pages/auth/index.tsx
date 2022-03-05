import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { authInfo } from '../../store/store';
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';
import AuthForm from '../../components/Auth/AuthForm';

type cartsFromDB = {
	id: string;
	_id: string;
	cartData: {
		url: string;
		title: string;
		price: number;
		id: string;
		key: string;
		quantity: number;
		size: string;
	}[];
};

type favoritesFromDB = {
	id: string;
	_id: string;
	favoritesData: {
		url: string;
		title: string;
		price: number;
		id: string;
	}[];
}

const AuthPage: NextPage<{ carts: cartsFromDB[], favorites: favoritesFromDB[]}> = (props) => {
	const authData = useSelector(authInfo);
	const router = useRouter();

	const carts = props.carts.map((cart) => {
		return { id: cart.id, cart: cart.cartData };
	});

	const favorites = props.favorites.map((favorite) => {
		return { id: favorite.id, favorites: favorite.favoritesData };
	});

	if (authData.isLoggedIn === true) {
		router.push('/');
	}
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<AuthForm carts={carts} favorites={favorites}/>
		</div>
	);
};

export default AuthPage;

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/ProductsDB?retryWrites=true&w=majority'
	);
	const db = client.db();
	const cartsCollection = db.collection('Carts');
	const carts = await cartsCollection.find().toArray();
	const favoritesCollection = db.collection('Favorites');
	const favorites = await favoritesCollection.find().toArray();

	client.close();

	return {
		props: {
			carts,
			favorites,
		},
		revalidate: 1,
	};
}
