import React, { useState, useEffect } from "react"
import axios from "axios"
import Header from "./components/ui/Header"
import Grid from "./components/Grid"
import Search from "./components/ui/Search"
import "./App.css"

function App() {
  //   const [collection, setCollection] = useState([]);
  const [isLoading, setisLoading] = useState(true)
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState("galaxy")
  const imageAndVidApi = `https://images-api.nasa.gov/search?q=${query}&media_type=image&page=1`
  const defaultQuery = "galaxy"

  const fetchItems = async () => {
    setisLoading(true)
    if (query === "") setQuery(defaultQuery)
    const result = await axios(imageAndVidApi)
    // setCollection(result.data.collection);
    setPhotos(result.data.collection.items)
    setisLoading(false)
  }

  useEffect(() => fetchItems(), [query])
  return (
    <div className="container-fluid">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <Grid isLoading={isLoading} photos={photos} />
    </div>
  )
}

export default App
