import classes from './_ModificationAdd.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNav, setNavsStates } from '../../store/Slices/underlinedNavSlice';

const ModificationAdd: React.FC = () => {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSectionVisible, setIsSectionVisible] = useState(false);
	const [enteredTitle, setEnteredTitle] = useState('');
	const [enteredPrice, setEnteredPrice] = useState('');
	const [enteredUrl, setEnteredUrl] = useState('');
	const [isValidTitle, setIsValidTitle] = useState(false);
	const [isValidPrice, setIsValidPrice] = useState(false);
	const [isValidUrl, setIsValidUrl] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	//handling visibility of a section with a form
	const sectionVisibilityHandler = () => {
		setIsSectionVisible(!isSectionVisible);
		setIsSubmitted(false);
	};

	//handling inputs
	const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredTitle(event.target.value);
		const re = /^[0-9A-Za-z\s\-]+$/;
		if (re.test(event.target.value) && event.target.value.length <= 12) {
			setIsValidTitle(true);
		} else {
			setIsValidTitle(false);
		}
	};
	const urlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredUrl(event.target.value);
		const re =
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
		if (re.test(event.target.value)) {
			setIsValidUrl(true);
		} else {
			setIsValidUrl(false);
		}
	};
	const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredPrice(parseFloat(event.target.value).toFixed(2));
		const re = /^[+-]?\d+(\.\d+)?$/;
		if (re.test(event.target.value) && event.target.value.length <= 8) {
			setIsValidPrice(true);
		} else {
			setIsValidPrice(false);
		}
	};

	//handling form submission
	const formSubmission = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitted(true);
		if (isValidTitle && isValidPrice && isValidUrl) {
			axios
				.post('/api/new-product', {
					title: enteredTitle,
					url: enteredUrl,
					price: enteredPrice,
					blockade: false,
				})
				.then(() => {
					dispatch(setNavsStates(false));
					dispatch(setNav({ navName: 'userPerspective', isActive: true }));
					setIsSectionVisible(!isSectionVisible);
					router.push('./');
				})
				.catch((error) => {
					alert(error.response.statusText);
				});
		}
	};

	return (
		<div className={classes.modificationAdd}>
			{!isSectionVisible ? (
				<button
					onClick={sectionVisibilityHandler}
					className={classes.addProduct}>
					Add a New Product
				</button>
			) : (
				<form className={classes.form}>
					<div className={classes.title}>Add a New Product</div>
					<div className={classes.field}>
						<label htmlFor='title'>Title:</label>
						<input onChange={titleHandler} type='text' id='title'></input>
						{isValidTitle === false && isSubmitted == true && (
							<p
								className={
									classes.error
								}>{`Enter valid title(length <= 12)`}</p>
						)}
					</div>
					<div className={classes.field}>
						<label htmlFor='price'>Price:</label>
						<input onChange={priceHandler} type='text' id='price'></input>
						{isValidPrice === false && isSubmitted == true && (
							<p className={classes.error}>Enter valid price</p>
						)}
					</div>
					<div className={classes.field}>
						<label htmlFor='url'>Url:</label>
						<div className={classes.note}>1. Https protocole required </div>
						<div className={classes.note}>2. Recommended size: 800x1155px</div>
						<input onChange={urlHandler} type='text' id='url'></input>
						{isValidUrl === false && isSubmitted == true && (
							<p className={classes.error}>Enter valid url</p>
						)}
					</div>
					<div className={classes.actions}>
						<button
							type='submit'
							onClick={formSubmission}
							className={classes.add}>
							Add
						</button>
						<button
							type='button'
							className={classes.cancel}
							onClick={sectionVisibilityHandler}>
							Cancel
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default ModificationAdd;
