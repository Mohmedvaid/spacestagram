import React, { useState, useEffect } from 'react';
import Header from './components/ui/Header';
import Grid from './components/Grid';
import './App.css';
import axios from 'axios';
import Search from './components/ui/Search';

function App() {
  const [collection, setCollection] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('galaxy');
  let imageAndVidApi = `https://images-api.nasa.gov/search?q=${query}&media_type=image&page=1`;
  const fetchItems = async () => {
    setisLoading(true);
    if(query === '') setQuery('galaxy');
    const result = await axios(imageAndVidApi);
    setCollection(result.data.collection);
    setPhotos(result.data.collection.items);
    setisLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [query]);
  return (
    <div className="container-fluid">
      <div className="row">
        <Header />
      </div>
      <Search getQuery={(q) => setQuery(q)} />
      <Grid isLoading={isLoading} photos={photos} />
    </div>
  );
}

export default App;
