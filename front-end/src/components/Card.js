import React from 'react'

const Card = ({ photo }) => {
	console.log(photo)
	return (
		<div className="card">
			<div className="card-inner">
				<div className="card-front">
					<img src={photo.links[0].href} alt="" />
				</div>
				<div className="card-back">
					<h1>{photo.rover.name}</h1>
					<ul>
						{/* TODO  */}
						<li> 
							<strong>Info:</strong> {photo.camera.full_name}
						</li>
						<li>
							<strong>Date:</strong> {photo.earth_date}
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Card
