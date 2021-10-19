import React from 'react'
import { IState as IPropImport } from '../App'
import pokemonLogo from '../img/pokemonLogo.png'

interface IProp {
  pokemons: IPropImport['pokemons'],
  pokemonsBackup: IPropImport['pokemons'],
  setPokemons:  React.Dispatch<React.SetStateAction<IPropImport['pokemons']>>
}

const PokemonSearch: React.FC<IProp> = ({pokemons, setPokemons, pokemonsBackup}) => {
  const filterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemons(pokemonsBackup.filter(pokemon => pokemon.name.includes(e.target.value)))
  }

  return(
    <div className="left-panel">
      <div className="logo-container">
        <img className="logo" src={pokemonLogo} alt="P  okemon Logo"/>
        <p className="text text--20"> ULTIMATE POKEDEX </p>
      </div>

      <div className="search-sp">
        <p className="text text--25 text--yellow"> PokeSearch </p>
        <input className="pokemon-search" type="text" onChange={filterData}/>
      </div>

      <p className="text text--20 text--mb20 text--intro">
        The Ultimate Pokedex is a Pokemon Collection Project Created for
        <span className="text--yellow">
          #PokeAddicts.
        </span> Click the PokeCard to view the Pokemon's Data.
      </p>

      <p className="text text--20 text--yellow sp-none"> TOOLS </p>

      <p className="text text--20 text--mb20 sp-none">
        <a className="text--white" target="_blank" href="https://reactjs.org/" >
          React JS
        </a>|
        <a className="text--white" target="_blank" href="https://pokeapi.co/" >
           PokeAPI
        </a>|
      </p>

      <p className="text text--20 text--yellow sp-none"> DEVELOPMENT </p>

      <a target="_blank" href="https://github.com/paoloLigsay/thepokemonproject" className="text text--20 sp-none">
        Fork in Github 
        <span className="text--yellow">
          [ thepokemonproject ] 
        </span> 
      </a>

      <a target="_blank" href="https://paolomartinligsay.netlify.app/" className="text text--20 sp-none">
        Developer
        <span className="text--yellow">
          [ Paolo Ligsay ] 
        </span> 
      </a>
    </div>
  )
}

export default PokemonSearch