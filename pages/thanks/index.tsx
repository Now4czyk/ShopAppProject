import { NextPage } from 'next';
import Head from 'next/head';
import Thanks from '../../components/Others/Thanks';

const ThanksPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Thanks/>
		</>
	);
};

export default ThanksPage;
