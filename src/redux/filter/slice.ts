import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
	search: '',
	category: '',
	sort: '',
}

const filterSlice = createSlice({
	name: '@@filter',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload
		},
		setSort: (state, action: PayloadAction<string>) => {
			state.sort = action.payload
		},
		clearFilters: (state) => state = initialState,
	},
})


export const { setSearch, setCategory, setSort, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;