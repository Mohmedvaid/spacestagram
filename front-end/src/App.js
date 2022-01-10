import React, { useState, useEffect } from 'react'
import Header from './components/ui/Header'
import axios from 'axios'
import './App.css'

function App() {
	const [items, setItems] = useState([])
	const [isLoading, setisLoading] = useState(true)

	useEffect(() => {
		const fetchItems = async () => {
			const result = await axios(
				`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=1000&page=1`
			)
			setItems(result.data)
			setisLoading(false)
			console.log(result.data.photos)
		}
		fetchItems()
	}, [])
	return (
		<div className="container">
			<Header />
		</div>
	)
}

export default App
