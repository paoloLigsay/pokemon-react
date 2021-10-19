import React, { useEffect } from 'react'
import PokeBallUpper from '../img/pokeballUpper.png'
import PokeBallLower from '../img/pokeballLower.png'

interface IProp {
  pokemonData: {
    id: number;
    name: string;
    type: string;
    abilitiesURL: string[];
    abilities: {
        abilityName: string;
        abilityDes: string;
    }[];
    image: string;
  }
}

const PokemonData: React.FC<IProp> = ({pokemonData}) => {
  const hideData = () => {
    const dataHolder = document.querySelector('.pokemon-data-holder')
    const searchBar = document.querySelector('.left-panel')
    const body = document.querySelector('body')

    dataHolder && dataHolder.classList.remove('pokemon-data-holder--active')
    body && body.classList.remove('overflowHidden')
    searchBar && searchBar.classList.remove('left-panel--hide')
  }

  useEffect(() => {
    console.log(pokemonData)
  }, [])

  return(
    <div className="pokemon-data-holder" onClick={hideData}>
      <ul className="pokemon-data-container">
        <li className="pokemon-data-image-container">
          <img className="pokemon-data-image" src={PokeBallUpper} alt="PokeBall Upper" />
          <img className="pokemon-data-image-main" src={pokemonData.image} alt={pokemonData.name}/>
          <img className="pokemon-data-image pokemon-data-image--bottom" src={PokeBallLower} alt="PokeBall Upper" />
        </li>

        <li className="pokemon-data">
        <h2 className="pokemon-data__title"> POKEMON DATA </h2>
        <div className="pokemon-data-row pokemon-data-row--name">
          <p className="pokemon-data__label"> [ Pokemon ] - </p>
          <p className="pokemon-data__info"> { pokemonData.type } </p>
        </div>

        <div className="pokemon-data-row">
          <p className="pokemon-data__label"> [ Type ] - </p>
          <p className="pokemon-data__info">
          {
            pokemonData.abilities.map(ability => {
              return(
                ability.abilityName
              )
            })
          }
          </p>
        </div>

        <h3 className="pokemon-data__subtitle"> Pokemon Abilities </h3>

        <div className="pokemon-data-ability">
          {
            pokemonData.abilities.map(pokemonAbility => {
              return(
                <>
                  <h4 className="pokemon-data__label pokemon-data__label--mb25">
                    {pokemonAbility.abilityName}
                  </h4>
                  <p className="pokemon-data__info"> 
                    {pokemonAbility.abilityDes}
                  </p>
                </>
              )
            })
          }
        </div>

      </li>
      </ul>
    </div>
  )
}

export default PokemonData