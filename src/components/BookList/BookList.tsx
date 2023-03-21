
import React, { useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner'
import style from './BookList.module.css'
import Book from '../Book/Book'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loadBooks, loadMoreBooks, addStartIndex } from '../../redux/books/slice';
import { Status } from '../../redux/books/types';
import { STEP_PAGE } from '../../const';

const BookList = () => {
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
	}, [startIndex])

	const onClickLoadBooks = () => {
		dispatch(addStartIndex())
	}


	return (
		<>
			{status === Status.LOADING ?
				<InfinitySpin
					width='200'
					color="#1A73E8"
				/> :
				error ? <h2 className={style.error}>{error}</h2> :
					<div className={style.content}>
						<p>Found {totalItems} results</p>
						<ul className={style.bookList}>
							{list?.map((item) => (
								<Book key={item.etag} book={item} />
							))}
						</ul>
						{status === Status.LOADING_MORE &&
							<InfinitySpin
								width='200'
								color="#1A73E8"
							/>
						}
						<button className={style.btn} onClick={onClickLoadBooks}>LOAD MORE</button>
					</div>
			}
		</>
	)
}

export default BookList