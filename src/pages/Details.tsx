import React from 'react'
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails/BookDetails';

const Details = () => {
	const params = useParams();
	return (
		<>
			<BookDetails id={params.id || ''} />
		</>
	)
}

export default Details