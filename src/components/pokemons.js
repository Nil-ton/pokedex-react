import axios from "axios"
import { useEffect, useState } from "react"

export default function Pokemons() {
    useEffect(() => {
        const pokemonList = []

        for (let i = 1; i <= 150; i++) {
            pokemonList.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => response.data)
            )
        }

        Promise.all(pokemonList)
            .then(response => {
                setPokemons(response)
            })

    }, [])

    const [pokemons, setPokemons] = useState([])

    const showPokemons = pokemons.map(
        (pokemon) =>

            <ul key={pokemon.name}>
                <li>
                    <h1>{`#${pokemon.id} ${pokemon.name}`}</h1>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div className = "stats">
                        <p>{`HP ${pokemon.stats[0].base_stat}`}</p>
                        <p>{`ATT ${pokemon.stats[1].base_stat}`}</p>
                        <p>{`DEF ${pokemon.stats[2].base_stat}`}</p>
                        <p>{`TYPE ${pokemon.types[0].type.name}`}</p>

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