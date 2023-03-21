import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loadBooks, loadMoreBooks, addStartIndex } from '../../redux/books/slice';
import { STEP_PAGE } from '../../const';


export const useBook = () => {
	const dispatch = useAppDispatch();
	const { totalItems, list, startIndex, status, error } = useAppSelector((state) => state.books);
	const { search, category, sort } = useAppSelector(state => state.filter)


	useEffect(() => {
		const filterCategory = category === '' || category === 'all' ? '' : '+subject:' + category
		const filterSort = sort !== '' ? `&orderBy=${sort}` : '';
		dispatch(loadBooks({
			maxResults: STEP_PAGE,
			search: search ? search : "Harry",
			category: filterCategory,
			sort: filterSort
		}))
	}, [category, dispatch, search, sort])

	useEffect(() => {
		const filterCategory = category === '' || category === 'all' ? '' : '+subject:' + category
		const filterSort = sort !== '' ? `&orderBy=${sort}` : '';
		const page = startIndex ? `&startIndex=${startIndex}` : `&startIndex=0`;
		if (startIndex || startIndex > 0)
			dispatch(loadMoreBooks({
				maxResults: STEP_PAGE,
				search: search ? search : "Harry",
				category: filterCategory,
				sort: filterSort,
				startIndex: page
			}))
	}, [startIndex, dispatch])

	const handleLoadMoreBooks = () => {
		dispatch(addStartIndex())
	}
	return [handleLoadMoreBooks, { totalItems, list, startIndex, status, error }] as const;
}