import { IBook } from '../../types/book';
import { Status } from '../books/types';

export interface DetailsSliceState {
	details: IBook,
	status: Status,
	error: string | null
}

export type LoadDetailsArgs = {
	id: string
}