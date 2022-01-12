import React, { useState, useEffect } from 'react'
import { BsHeartFill, BsHeart } from 'react-icons/bs'

const Card = ({ photo, addNewLike, removeLike, isLikedImage }) => {
	let data = photo.data[0]
	let imgSrc = photo.links[0].href
	let dateCreated = new Date(data.date_created).toLocaleDateString('en-US')
	let description = data.description
	let [isLiked, setIsLiked] = useState(isLikedImage)
	const toggleLike = () => {
		setIsLiked(!isLiked)
	}

	const copyImageUrl = async () => {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(imgSrc)
		} else {
			document.execCommand('copy', true, imgSrc)
		}
		alert('Image URL copied to clipboard')
	}

	useEffect(() => {
		if (isLiked) addNewLike(data.nasa_id)
		else removeLike(data.nasa_id)
	}, [isLiked])

	return (
		<div className="m-1">
			<div className="card" aria-label="card">
				<img
					className="card-img-top img-fluid"
					src={imgSrc}
					alt={'Image description: ' + description}
					tabIndex={0}
				/>
				<div className="card-body">
					<h4 className="card-title text-dark">{data.title}</h4>
					<div className="d-flex justify-content-between my-1">
						{/* disbaling text selection on ancher below as clicking like button multiple times was highligting the date text */}
						<button
							aria-label="toggle like"
							className="likeBtn m-1 disable-text-selection"
							tabIndex={0}
							onClick={() => toggleLike()}
						>
							{/* like icon */}
							<span>
								{' '}
								{isLiked ? (
									<BsHeartFill size="2em" color="red" />
								) : (
									<BsHeart size="2em" color="red" />
								)}
							</span>
						</button>
						<a className="copyBtn m-1 cursor-pointer" tabIndex={0} onClick={() => copyImageUrl()}>
							Copy Image URL
						</a>
						<p className="card-text text-dark">
							<small aria-label='photo date' className="text-muted">{dateCreated}</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
