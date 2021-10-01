import 'semantic-ui-css/semantic.min.css'
import Pokemons from "./components/pokemons"
import { Icon, Input } from 'semantic-ui-react'


function App() {
  return (
    <>
      <div className="conteinerPokedex">
        <h1>Pokedex</h1>
        <Input
          icon={<Icon name='search' inverted circular link />}
          placeholder='Search...'
          className="searchPokedex"
        />
      </div>
      <Pokemons />
    </>
  );
}

export default App;
