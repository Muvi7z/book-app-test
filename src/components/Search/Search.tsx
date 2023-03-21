import React, { useState, KeyboardEvent } from 'react'
import style from './Search.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch } from '../../redux/store';
import { setSearch } from '../../redux/filter/slice';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
	const [value, setValue] = useState<string>('');

	const dispatch = useAppDispatch()
	const navigate = useNavigate()


	const onChangeSearch = () => {
		if (value) {
			dispatch(setSearch(value.replaceAll(' ', '+')))
			navigate('/')
		}
	}

	const handleKeySearch = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			onChangeSearch()
		}
	}


	return (
		<div className={style.search}>
			<input onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeySearch(e)} className={style.input} onChange={(e) => setValue(e.target.value)} placeholder='Search books' value={value} />
			<button className={style.button} onClick={() => onChangeSearch()}>
				<AiOutlineSearch size={30} />
			</button>
		</div>
	)
}

export default Search