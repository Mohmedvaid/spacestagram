import React, { useState, useEffect } from "react"
import axios from "axios"
import Header from "../components/ui/Header"
import Search from "../components/ui/Search"
import Grid from "../components/Grid"
import ScrollUpButton from "../components/ui/ScrollUpButton"
import Pagination from "../components/ui/Pagination"

function Home() {
  const defaultQuery = "galaxy"
  const baseURL = "https://images-api.nasa.gov/search?media_type=image"
  const startYearStr = "year_start"
  const endYearStr = "year_end"
  const pageStr = "page"
  const defaultQueryURL = `${baseURL}&q=${defaultQuery}&page=1` // fire on page load

  const [isLoading, setisLoading] = useState(true)
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPage, setNextPage] = useState(2)
  const [prevPage, setPrevPage] = useState(0)
  const [error, setError] = useState(null)
  const [queryURL, setQueryURL] = useState(defaultQueryURL)
  const [searchParams, setSearchParams] = useState({ query: defaultQuery })

  /**
   * sets the query url after checking start and end year
   */
  const updateQueryURL = () => {
    const { query, startYear, endYear } = searchParams
    let url = `${baseURL}&q=${query}&${pageStr}=${currentPage}`
    if (startYear) url += `&${startYearStr}=${startYear}`
    if (endYear) url += `&${endYearStr}=${endYear}`
    setQueryURL(url)
  }

  /**
   * checks if pagination exists and sets the next and prev page
   * @param {Array<{rel:String, rel:String, Prompt:String}>} paginationLinks
   * @returns {void}
   */
  const setPagination = (paginationLinks) => {
    if (paginationLinks.length > 0) {
      setNextPage(
        paginationLinks.find((link) => link.rel === "next")
          ? currentPage + 1
          : 0
      )

      setPrevPage(
        paginationLinks.find((link) => link.rel === "prev")
          ? currentPage - 1
          : 0
      )
    } else {
      setNextPage(0)
      setPrevPage(0)
    }
  }

  /**
   * sets the photos array and pagination links
   * @param {Response} res
   */
  const updatePhotosAndPagination = (res) => {
    setPhotos(res.data.collection.items)
    const paginationLinks = res.data.collection.links || []
    setPagination(paginationLinks)
  }

  /**
   * gets the photos from the query url and sets the photos state
   */
  const fetchData = async () => {
    try {
      setisLoading(true)
      const res = await axios.get(queryURL)
      updatePhotosAndPagination(res)
      setisLoading(false)
    } catch (err) {
      setError(err.response.data.reason)
      setisLoading(false)
    }
  }

  /**
   * resets the pagination and query url on change of search params
   */
  useEffect(() => {
    setCurrentPage(1)
    updateQueryURL()
  }, [searchParams])

  /**
   * updates query url on change of page
   */
  useEffect(() => {
    updateQueryURL()
  }, [currentPage])

  /**
   * fetches data on query url change
   */
  useEffect(() => {
    fetchData()
  }, [queryURL])

  return (
    <div className="container-fluid pb-5">
      <Header title="Browse images from NASA" />
      <Search setSearchParams={(formData) => setSearchParams(formData)} />
      {error ? (
        <div className={`alert alert-danger ${error}? "d-block"`} role="alert">
          Hmmm, something went wrong!
        </div>
      ) : (
        <>
          <Grid isLoading={isLoading} photos={photos} />
          <Pagination
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            handlePageChange={(page) => setCurrentPage(page)}
          />
          <ScrollUpButton />
        </>
      )}
    </div>
  )
}
export default Home
