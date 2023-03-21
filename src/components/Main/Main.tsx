import React from 'react'
import { MainProps } from './Main.props'
import style from './Main.module.css'


const Main = ({ children }: MainProps) => {
	{ console.log(process.env.API, process.env.API_KEY) }
	return (
		<main className={style.container}>{children}</main>

	)
}

export default Main