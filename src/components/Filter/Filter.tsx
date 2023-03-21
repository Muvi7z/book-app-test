import React from 'react'
import style from './Filter.module.css'
import CustomSelect from '../CustomSelect/CustomSelect'
import { ISelectItem } from '../../types/select'
import { useAppDispatch } from '../../redux/store'
import { setCategory, setSort } from '../../redux/filter/slice'
import { useNavigate } from 'react-router-dom'

const categories: ISelectItem[] = [
	{ label: 'all', value: 'all' },
	{ label: 'art', value: 'art' },
	{ label: 'biography', value: 'biography' },
	{ label: 'computers', value: 'computers' },
	{ label: 'history', value: 'history' },
	{ label: 'medical', value: 'medical' },
	{ label: 'poetry', value: 'poetry' },
]

const sorts: ISelectItem[] = [
	{ label: 'relevance', value: 'relevance' },
	{ label: 'newest', value: 'newest' },
]

const Filter: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate()

	const handleChangeCategory = (category: ISelectItem | null) => {
		if (category) {
			dispatch(setCategory(category.value))
			navigate('/')
		}
	}

	const handleChangeSort = (sort: ISelectItem | null) => {
		if (sort) {
			dispatch(setSort(sort.value))
			navigate('/')
		}
	}

	return (
		<div className={style.filter}>
			<div className={style.wrapper}>
				<span className={style.label}>Categories</span>
				<CustomSelect options={categories} handleChange={handleChangeCategory} />
			</div>
			<div className={style.wrapper}>
				<span className={style.label}>Sorting by</span>
				<CustomSelect options={sorts} handleChange={handleChangeSort} />
			</div>
		</div>
	)
}

export default Filter