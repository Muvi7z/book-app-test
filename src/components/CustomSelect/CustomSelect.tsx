import React from 'react'
import { CustomSelectProps } from './CustomSelect.props';
import style from './CustomSelect.module.css'
import Select from 'react-select';

const CustomSelect: React.FC<CustomSelectProps> = ({ options, handleChange }) => {

	return (
		<>
			<Select
				className={style.select}
				options={options}
				defaultValue={options[0]}
				onChange={handleChange}
			/>

		</>
	)
}

export default CustomSelect