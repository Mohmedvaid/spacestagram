import React, { useState, useEffect } from "react"
import axios from "axios"
import Header from "../components/ui/Header"
import Search from "../components/ui/Search"
import Grid from "../components/Grid"
import ScrollUpButton from "../components/ui/ScrollUpButton"
import Pagination from "../components/ui/Pagination"

function Home() {
  const [isLoading, setisLoading] = useState(true)
  const [photos, setPhotos] = useState([])
  const [query, setQuery] = useState("galaxy")
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPage, setNextPage] = useState(2)
  const [prevPage, setPrevPage] = useState(0)
  const [queryChange, setQueryChange] = useState(false)
  const imageAndVidApi = `https://images-api.nasa.gov/search?q=${query}&media_type=image&page=${currentPage}`
  const defaultQuery = "galaxy"
  /**
   * update the query state when the user types in the search bar
   * @param {string} q
   */
  const handleQueryChange = (q) => {
    setQueryChange(true)
    setQuery(q)
  }

  /**
   * get data from the NASA API
   * @returns {array} array of photos
   */
  const fetchItems = async () => {
    if (query === "") setQuery(defaultQuery)
    return axios(imageAndVidApi)
  }

  const setPagination = (paginationLinks) => {
    if (paginationLinks.length > 0) {
      setNextPage(
        paginationLinks.find((link) => link.rel === "next")
          ? currentPage + 1
          : 0
      )
    } else {
      setNextPage(0)
    }
    if (queryChange) {
      setPrevPage(0)
    } else {
      setPrevPage(
        paginationLinks.find((link) => link.rel === "prev")
          ? currentPage - 1
          : 0
      )
    }
  }

  /**
   * update the photos state when the query changes
   */
  useEffect(async () => {
    setisLoading(true)
    if (queryChange) setCurrentPage(1)

    const result = await fetchItems()
    const paginationLinks = result.data.collection.links || []

    setPagination(paginationLinks)
    setPhotos(result.data.collection.items)
    setQueryChange(false)
    setisLoading(false)
  }, [query, currentPage])

  return (
    <div className="container-fluid pb-5">
      <Header title="Browse images from NASA" />
      <Search getQuery={(q) => handleQueryChange(q)} />
      <Grid isLoading={isLoading} photos={photos} />
      <Pagination
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        handlePageChange={(page) => setCurrentPage(page)}
      />
      <ScrollUpButton />
    </div>
  )
}
export default Home
