import { ISelectItem } from '../../types/select';

export interface CustomSelectProps {
	options: ISelectItem[],
	handleChange: (category: ISelectItem | null) => void,
}