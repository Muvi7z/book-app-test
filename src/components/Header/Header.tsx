import React from 'react'
import style from './Header.module.css'
import Search from '../Search/Search'
import Filter from '../Filter/Filter'
const Header = () => {
	return (
		<header className={style.header}>
			<h2 className={style.title}>Search for books</h2>
			<Search />
			<Filter />
		</header>
	)
}

export default Header