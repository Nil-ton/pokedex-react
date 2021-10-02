import 'semantic-ui-css/semantic.min.css'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Icon, Input } from 'semantic-ui-react'
import { useEffect, useState } from 'react/cjs/react.development'
import axios from "axios"
import Pokemons from "./components/Pokemons"
function App() {

  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const pokemonList = []
    for (let i = 1; i <= 898; i++) {
      pokemonList.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => response.data).catch(error => console.log(error))
      )
    }

    Promise.all(pokemonList)
      .then(response => {
        setPokemons(response)
        setLoading(true)
      })
      .catch(error => console.log(error))
      
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const show = () => {
    if (loading === false) {
        return <div>
            <Segment>
                <Dimmer active>
                    <Loader />
                </Dimmer>

                <Image src='/images/wireframe/short-paragraph.png' />
            </Segment>
        </div>
    } else {
        return <Pokemons search={search} pokemons={pokemons} loading = {loading}/>
    }
}



  return (
    <>
      <div className="conteinerPokedex">
        <h1>Pokedex</h1>
        <Input
          icon={<Icon name='search' inverted circular link />}
          placeholder='Search... [id, name or type]'
          className="searchPokedex"
          value={search}
          onChange={handleChange}
        />
         {show()}
      </div>
    </>
  );
}

export default App;
