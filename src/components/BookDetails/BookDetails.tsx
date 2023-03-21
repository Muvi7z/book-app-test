import React, { useEffect } from 'react'
import style from './BookDetails.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { BookDetailsProps } from './BookDetails.props';
import { clearDetails, loadBookDetails } from '../../redux/details/slice';
import { Status } from '../../redux/books/types';
import { InfinitySpin } from 'react-loader-spinner';
import HTMLReactParser from 'html-react-parser';

const BookDetails: React.FC<BookDetailsProps> = ({ id }) => {
	const dispatch = useAppDispatch();

	const { details, error, status } = useAppSelector(state => state.details)
	const { volumeInfo } = details
	const imgUrl = volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.medium || volumeInfo.imageLinks?.small || volumeInfo.imageLinks?.thumbnail || 'https://images.placeholders.dev/?width=400&height=560&text=Book'
	useEffect(() => {
		if (id) {
			dispatch(loadBookDetails(id))
		}
		return () => {
			dispatch(clearDetails)
		}
	}, [dispatch, id])

	if (status === Status.LOADING) {
		return <InfinitySpin
			width='200'
			color="#1A73E8"
		/>
	}

	return (
		error ? <h2 className={style.error}>{error}</h2> :
			<div className={style.wrapper}>
				<div className={style.cover}>
					<img className={style.image} src={imgUrl} alt="" />
				</div>
				<div className={style.body}>
					<div className={style.category}>{volumeInfo.categories && volumeInfo.categories.join(' / ')}</div>
					<h3>{volumeInfo.title}</h3>
					<div>{volumeInfo.authors ? volumeInfo.authors.join(' ') : volumeInfo.publisher} · {volumeInfo.publishedDate}</div>
					<hr />
					<div className={style.desc}>{volumeInfo.description && HTMLReactParser(volumeInfo.description)}</div>
				</div>
			</div>

	)
}

export default BookDetails