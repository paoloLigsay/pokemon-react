import React, { useState } from 'react'
import { IState as IPropImport } from '../App'
import PokemonCard from './PokemonCard'

interface IProp {
  pokemons: IPropImport['pokemons'],
  setPokemonData: React.Dispatch<React.SetStateAction<{
    id: number;
    name: string;
    type: string;
    abilitiesURL: string[];
    abilities: {
        abilityName: string;
        abilityDes: string;
    }[];
    image: string;
} >>
}

const PokemonList: React.FC<IProp> = ({setPokemonData, pokemons}) => {

  let [pokemonCounter, setPokemonCounter] = useState(8)

  const showPokemonData = (id:number) => {
    const pokemonData = pokemons.filter(pokemon => id === pokemon.id)
    setPokemonData({...pokemonData, ...pokemonData[0]})

    const dataHolder = document.querySelector('.pokemon-data-holder')
    dataHolder && dataHolder.classList.add('pokemon-data-holder--active')

    const searchBar = document.querySelector('.left-panel')
    searchBar && searchBar.classList.add('left-panel--hide')

    const body = document.querySelector('body')
    body && body.classList.add('overflowHidden')
  }

  return (
    <>
            <div className="card-container">
              <ul className="card-list">
              {
                pokemons.map((pokemon, i) => {
                  if(i < pokemonCounter) {
                    return(
                      <li key={pokemon.id} className="card" onClick={() => showPokemonData(pokemon.id)} >
                        <PokemonCard pokemon={pokemon}/>
                      </li>
                      )
                  }
                  return ''
                })
              }
              </ul>
              {
              pokemons.length > 8 &&
              (<div className="load-more" onClick={() => setPokemonCounter(() => pokemonCounter = pokemonCounter+16)}> LOAD MORE </div>)
              }
             
            </div>
    </>
  )
}

export default PokemonList