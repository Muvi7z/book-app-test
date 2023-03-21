
import React from 'react';
import { InfinitySpin } from 'react-loader-spinner'
import style from './BookList.module.css'
import Book from '../Book/Book'
import { Status } from '../../redux/books/types';
import { useBook } from './use-book';

const BookList = () => {
	const [handleLoadMoreBooks, { totalItems, list, status, error }] = useBook();

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
						<button className={style.btn} onClick={handleLoadMoreBooks}>LOAD MORE</button>
					</div>
			}
		</>
	)
}

export default BookList