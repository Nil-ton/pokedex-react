

export default function Pokemons({ search, pokemons, loading }) {

    const filterPokemons = pokemons.filter(pokemon => pokemon.name.includes(search.toLowerCase()) || pokemon.id === parseInt(search) || pokemon.types[0].type.name === search.toLowerCase())
    const showPokemons = filterPokemons.map(
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
        <div className="showPokemons">
            {showPokemons}
        </div>
    )
}