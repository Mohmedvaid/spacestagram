import React, { useState } from 'react'

const Search = ({ getQuery }) => {
	const [text, setText] = useState('')

	const handleOnClick = (e) => {
		getQuery(text.trim())
	}
	const onChange = (q) => {
		setText(q)
	}

	return (
		<section className="search">
			<form
				className="d-flex justify-content-center"
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<input
					id="searchBox"
					type="text"
					className="form-control m-2"
					placeholder="Enter keywords to begin search"
					value={text}
					onChange={(e) => onChange(e.target.value)}
					autoFocus
				/>
				<button className="btn btn-primary search-btn m-2" onClick={(e) => handleOnClick(e)}>
					Search
				</button>
			</form>
		</section>
	)
}

export default Search
