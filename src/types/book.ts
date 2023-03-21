
export interface IVolumeInfo {
	title: string,
	authors?: string[]
	publisher: string,
	publishedDate: string,
	description: string,
	pageCount: number,
	categories: string[],
	imageLinks: IImageLinks,
	averageRating: number
}

export interface IImageLinks {
	smallThumbnail: string,
	thumbnail: string,
	small?: string,
	medium?: string,
	large?: string
}

export interface IBook {
	id: string,
	etag: string,
	volumeInfo: IVolumeInfo,
	language: string
}