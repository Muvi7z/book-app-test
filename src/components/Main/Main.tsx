import React from 'react'
import { MainProps } from './Main.props'
import style from './Main.module.css'


const Main = ({ children }: MainProps) => {

	return (
		<main className={style.container}>{children}</main>
	)
}

export default Main