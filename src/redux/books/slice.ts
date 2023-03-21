import axios from 'axios';
import { BooksSliceState, LoadBooksArgs, LoadBooksReturn, Status } from './types';
import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API, API_KEY, STEP_PAGE } from '../../const';

const initialState: BooksSliceState = {
	list: [],
	totalItems: 0,
	startIndex: 0,
	status: Status.LOADING,
	error: null,
}

export const loadBooks = createAsyncThunk<LoadBooksReturn, LoadBooksArgs, { rejectValue: string }>(
	'@@books/load-books',
	async (params, { rejectWithValue }) => {
		const { maxResults, search, category, sort } = params

		const res = await axios.get<LoadBooksReturn>(
			`${API}?q=${search}${category}${sort}&maxResults=${maxResults}&key=${API_KEY}`,
		);
		if (res.status !== 200)
			return rejectWithValue('Server error!')
		return res.data;

	}
)
export const loadMoreBooks = createAsyncThunk<LoadBooksReturn, LoadBooksArgs, { rejectValue: string }>(
	'@@books/load-more-books',
	async (params, { rejectWithValue }) => {
		const { maxResults, search, category, sort, startIndex } = params
		const res = await axios.get<LoadBooksReturn>(
			`${API}?q=${search}${category}${sort}${startIndex}&maxResults=${maxResults}&key=${API_KEY}`,
		);
		if (res.status !== 200)
			return rejectWithValue('Server error!')
		return res.data;

	}
)

const booksSlice = createSlice({
	name: '@@books',
	initialState,
	reducers: {
		addStartIndex: (state) => {
			state.startIndex += STEP_PAGE
		},
		setStartIndex: (state, action: PayloadAction<number>) => {
			state.startIndex = action.payload
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loadBooks.pending, (state) => {
				state.status = Status.LOADING
				state.error = null
			})
			.addCase(loadBooks.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.list = action.payload.items
				state.totalItems = action.payload.totalItems
				state.startIndex = 0
			})
			.addCase(loadMoreBooks.pending, (state) => {
				state.status = Status.LOADING_MORE
				state.error = null
			})
			.addCase(loadMoreBooks.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.list = state.list.concat(action.payload.items) //state.list.concat
				state.totalItems = action.payload.totalItems
			})
			.addMatcher(isError, (state, action: PayloadAction<string>) => {
				state.status = Status.ERROR
				state.error = action.payload || 'Error'; //|| action.error.message 
			})
	},
})

function isError(action: AnyAction) {
	return action.type.endsWith('rejected')
}

export const { addStartIndex, setStartIndex } = booksSlice.actions;

export default booksSlice.reducer;