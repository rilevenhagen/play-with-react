import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const apiKey = '7WY91ct7';

  const [art, setArt] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Make an API to the Rijks Museum API
  useEffect(() => {
    axios({
      url: 'https://www.rijksmuseum.nl/api/en/collection',
      method: 'GET',
      dataResponse: 'json',
      params: {
        key: apiKey,
        imgonly: true,
        q: searchTerm,
      }
    }).then((response) => {
      console.log(response.data.artObjects);
      setArt(response.data.artObjects);
    });
  }, [searchTerm])

  const handleInput = (event) => {
    console.log('is this working?', event.target.value);
    setUserInput(event.target.value); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);
  }

  return (
    <div className="App">
      <h1> Welcome back to the Art Museum </h1>
      <h2> Testing by climbing using React with git </h2>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="search">  Search for Art:  </label>
        <input type="text" id="search" onChange={ handleInput } value={userInput}/>
        <button>Search</button>
      </form>

      {art.map((artwork) => {
        return (
          <div key={artwork.id}>
            <h2>{artwork.longTitle}</h2>
            <img src={artwork.webImage.url} alt={artwork.title} />
          </div>
        )
      })}
    </div>
  );
}

export default App;
