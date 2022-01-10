import React, { useState, useEffect } from 'react'
import Header from './components/ui/Header'
import Grid from './components/Grid'
import './App.css'
import axios from 'axios'

function App() {
	const [items, setItems] = useState([])
	const [isLoading, setisLoading] = useState(true)
	let imageAndVidApi = `https://images-api.nasa.gov/search?q=mars&media_type=image&page=1`
	let marsPhotoApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=1000&page=2`
	useEffect(() => {
		const fetchItems = async () => {
			const result = await axios(imageAndVidApi)
			setItems(result.data)
			setisLoading(false)
		}
		fetchItems()
	}, [])
	return (
		<div className="container">
			<Header />
			<Grid isLoading={isLoading} photos={items} />
		</div>
	)
}

export default App
