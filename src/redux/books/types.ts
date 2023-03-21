import { IBook } from '../../types/book';

export enum Status {
	LOADING = 'loading',
	LOADING_MORE = 'loading more',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface BooksSliceState {
	list: IBook[],
	totalItems: number,
	startIndex: number,
	status: Status,
	error: string | null
}

export type LoadBooksArgs = {
	maxResults: number,
	search: string,
	category: string,
	sort: string,
	startIndex?: string
}

export type LoadBooksReturn = {
	kind: string,
	totalItems: number,
	items: IBook[]
}