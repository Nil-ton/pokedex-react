import 'semantic-ui-css/semantic.min.css'
import { Icon, Input } from 'semantic-ui-react'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from "axios"

function App() {

  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const pokemonList = []
    for (let i = 1; i <= 150; i++) {
      pokemonList.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.data).catch(error => console.log(error))
      )
    }

    Promise.all(pokemonList)
      .then(response => {
        setPokemons(response)
      })
      .catch(error => console.log(error))
  }, [])


const filterPokemonsName = pokemons.filter( pokemon => pokemon.name.includes(search.toLowerCase()) || pokemon.id === parseInt(search) || pokemon.types[0].type.name === search.toLowerCase())  
  const showPokemons = filterPokemonsName.map(
    (pokemon) =>
      <ul key={pokemon.name}>
        <li>
          <h1>{`#${pokemon.id} ${pokemon.name}`}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div className="stats">
            <h4>{`HP:   ${pokemon.stats[0].base_stat}`}</h4>
            <h4>{`ATT:  ${pokemon.stats[1].base_stat}`}</h4>
            <h4>{`DEF:  ${pokemon.stats[2].base_stat}`}</h4>
            <h4>{`TYPE: ${pokemon.types[0].type.name}`}</h4>
          </div>
        </li>
      </ul>
  )

  return (
    <>
      <div className="conteinerPokedex">
        <h1>Pokedex</h1>
        <Input
          icon={<Icon name='search' inverted circular link />}
          placeholder='Search... [id, name or type]'
          className="searchPokedex"
          value={search}
          onChange={(e) => { setSearch(e.target.value)}}
        />
        <div className="showPokemons">
          {showPokemons}
        </div>
      </div>
    </>
  );
}

export default App;
