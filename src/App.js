import React, { useState } from 'react';
import './App.css';

function App() {
  const [filme, setFilme] = useState('');
  const [filmes, setFilmes] = useState([]);

  const buscarFilme = async () => {
    const apiKey = '33279cc1';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${filme}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json.Search) {
        setFilmes(json.Search);
      } else {
        setFilmes([]);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setFilmes([]);
    }
  };

  return (
    <div>
      <h1 className='Title'>Busca de Filmes</h1>
      <div>
        <input
          type='text'
          value={filme}
          onChange={(e) => setFilme(e.target.value)}
          placeholder='Digite o nome do filme'
        />
        <button onClick={buscarFilme}>Buscar</button>
      </div>
      <div className='filmes-container'>
        {filmes.map((filme) => (
          <div key={filme.imdbID} className='filme'>
            <h2>{filme.Title}</h2>
            <img src={filme.Poster} alt={filme.Title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;