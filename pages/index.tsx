import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { useDispatch } from 'react-redux';
import { setAvailableProducts } from '../store/Slices/availableProductsSlice';
import ProductsList from '../components/Products/ProductsList';

type productsFromDB = {
	title: string;
	price: number;
	url: string;
	id: string;
	blockade: boolean;
};

const Home: NextPage<{ products: productsFromDB[] }> = (props) => {
	const dispatch = useDispatch();	
	useEffect(() => {
		const availableProducts = props.products.map((product) => ({
			url: product.url,
			title: product.title,
			price: product.price,
			key: product.id,
			id: product.id,
			blockade: product.blockade,
		}));
		dispatch(setAvailableProducts(availableProducts));
	}, []);
	return (
		<div>
			<Head>
				<title>ReactShop</title>
				<meta name='description' content='A page with available products' />
			</Head>
			<ProductsList />
		</div>
	);
};

export default Home;

export async function getStaticProps() {
	const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB);
	const products = await client.db().collection('Products').find().toArray();
	client.close();
	return {
		props: {
			products: products.map((product) => ({
				title: product.title,
				price: product.price,
				url: product.url,
				blockade: product.blockade,
				id: product._id.toString(),
			})),
		},
		revalidate: 1,
	};
}
