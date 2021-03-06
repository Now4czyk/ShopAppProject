import classes from './_FavoritesItem.module.scss';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { favoritesInfo } from '../../store/store';
import {
	addToFavorites,
	removeFromFavorites,
} from '../../store/Slices/favoriteSlice';

type data = {
	url: string;
	title: string;
	price: number;
	id: string;
};

const FavoritesItem: React.FC<{ product: data }> = (props) => {
	const dispatch = useDispatch();
	const favoritesData = useSelector(favoritesInfo);
	const router = useRouter();
	const product = {
		url: props.product.url,
		title: props.product.title,
		price: props.product.price,
		id: props.product.id,
	};

	//handling data from Favorites Slice
	const isFavorite = favoritesData.find(
		(product) => product.id === props.product.id
	);

	//handling buttons
	const addToFavoritesHandler = () => {
		dispatch(addToFavorites(product));
	};
	const removeFromFavoritesHandler = () => {
		dispatch(removeFromFavorites(product));
	};

	//handling redirection
	const redirectHandler = () => {
		router.push(`./${props.product.id}`);
	};

	return (
		<div className={classes.item}>
			<img
				onClick={redirectHandler}
				className={classes.productImg}
				src={props.product.url}
			/>
			<div className={classes.data}>
				<div onClick={redirectHandler} className={classes.title}>
					{props.product.title}
				</div>
				<span className={classes.id}>(${props.product.id})</span>
				<div className={classes.price}>${props.product.price}</div>
			</div>
			<div className={classes.actions}>
				{!isFavorite && (
					<img
						onClick={addToFavoritesHandler}
						className={classes.favorite}
						src='https://cdn.iconscout.com/icon/free/png-256/heart-favourite-favorite-love-like-outline-interface-4-14712.png'></img>
				)}
				{isFavorite && (
					<img
						onClick={removeFromFavoritesHandler}
						className={classes.favorite}
						src='https://user-images.githubusercontent.com/29887220/113503333-7e4f6280-9531-11eb-8fcd-cd5f2b1903b1.png'></img>
				)}
			</div>
		</div>
	);
};

export default FavoritesItem;
