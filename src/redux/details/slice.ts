import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DetailsSliceState, } from './types';
import { IBook } from '../../types/book';
import { Status } from '../books/types';
import { API, API_KEY } from '../../const';

const initialState: DetailsSliceState = {
	details: { //DETAILS FIX
		etag: '',
		id: '',
		language: '',
		volumeInfo: {
			averageRating: 0,
			categories: [],
			description: '',
			imageLinks: {
				smallThumbnail: '',
				thumbnail: ''
			},
			pageCount: 0,
			publishedDate: '',
			publisher: '',
			title: '',
		}
	},
	status: Status.LOADING,
	error: null
}

export const loadBookDetails = createAsyncThunk<IBook, string, { rejectValue: string }>(
	'@@details/load-details',
	async (id, { rejectWithValue }) => {
		const res = await axios.get<IBook>(
			`${API}/${id}?key=${API_KEY}`,
		);
		if (res.status !== 200)
			return rejectWithValue('Server error!')
		return res.data;

	}
)

const detailsSlice = createSlice({
	name: '@@details',
	initialState,
	reducers: {
		clearDetails: (state) => state = initialState,
	},
	extraReducers(builder) {
		builder
			.addCase(loadBookDetails.pending, (state) => {
				state.status = Status.LOADING
				state.error = null
			})
			.addCase(loadBookDetails.rejected, (state, action) => {
				state.status = Status.ERROR
				state.error = action.payload || action.error.message || 'Error';
			})
			.addCase(loadBookDetails.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.details = action.payload
			})
	},
})

export const { clearDetails } = detailsSlice.actions

export default detailsSlice.reducer;