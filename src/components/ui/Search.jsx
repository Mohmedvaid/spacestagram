import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Search({ getQuery }) {
	const [text, setText] = useState('');

	const handleOnClick = () => {
		getQuery(text.trim());
	};
	const onChange = (q) => {
		setText(q);
	};

	return (
		<section>
			<form
				className='d-flex justify-content-center'
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<input
					id='searchBox'
					type='text'
					className='form-control m-2'
					placeholder='Enter keywords to begin search'
					value={text}
					onChange={(e) => onChange(e.target.value)}
				/>
				<button type='submit' className='btn btn-primary search-btn m-2' onClick={(e) => handleOnClick(e)}>
					Search
				</button>
			</form>
		</section>
	);
}
Search.propTypes = {
	getQuery: PropTypes.func.isRequired,
};

export default Search;
