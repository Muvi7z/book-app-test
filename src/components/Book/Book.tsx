import React from 'react'
import { BookProps } from './Book.props'
import style from './Book.module.css'
import { Link } from 'react-router-dom';

const Book: React.FC<BookProps> = ({ book }) => {
	const { id, volumeInfo } = book;
	const image = volumeInfo.imageLinks?.small || volumeInfo.imageLinks?.thumbnail || 'https://images.placeholders.dev/?width=200&height=260&text=Book'
	return (
		<Link to={`/book/${id}`} style={{ textDecoration: 'none', color: 'black' }} >
			<div className={style.wrapper}>
				<div className={style.cover}>
					<img className={style.image} src={image} alt="" />
				</div>
				<div className={style.body}>
					<div className={style.category}>{volumeInfo.categories && volumeInfo.categories[0]}</div>
					<h3>{volumeInfo.title}</h3>
					<div>{volumeInfo.authors ? volumeInfo.authors : volumeInfo.publisher} · {volumeInfo.publishedDate}</div>
				</div>
			</div>
		</Link >

	)
}

export default Book