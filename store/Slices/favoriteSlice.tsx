import { createSlice, current } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

export type data = {
	url: string;
	title: string;
	price: number;
	id: string;
};

interface initialValues {
	data: data[];
}

const initialState: initialValues = {
	data: [],
};

export const favoriteSlice = createSlice({
	name: 'favoriteSlice',
	initialState,
	reducers: {
		addToFavorites(state, action: PayloadAction<data>) {
			state.data.push(action.payload);
			// console.log(current(state.data));
		},
		removeFromFavorites(state, action: PayloadAction<data>) {
			state.data = state.data.filter(
				(product) => product.id !== action.payload.id
			);
			// console.log(state.data);
		},
		clearFavorites(state) {
			state.data = [];
		},
		setFavorites(state, action: PayloadAction<data[] | undefined>) {
			if (action.payload !== undefined) {
				state.data = action.payload;
			}
		},
	},
});

export const favoriteReducer = favoriteSlice.reducer;

export const {
	addToFavorites,
	removeFromFavorites,
	clearFavorites,
	setFavorites,
} = favoriteSlice.actions;