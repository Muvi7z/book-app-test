import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import booksReducer from './books/slice'
import filterReducer from './filter/slice'
import detailsReducer from './details/slice'

const store = configureStore({
	reducer: {
		books: booksReducer,
		filter: filterReducer,
		details: detailsReducer,
	},
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store