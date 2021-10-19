import React from 'react'
import Reasct from 'react'

interface IState {
  pokemon: {
    id: number
    name: string
    type: string
    abilitiesURL: string[] 
    abilities: {
      abilityName: string
      abilityDes: string
    }[]
    image: string
  }
}

const PokemonCard = ({pokemon}:IState) => {
  return(
    <div>
      <img alt={pokemon.name} src={pokemon.image}/>
      <p className="text text--25"> {[pokemon.name]} </p>
    </div>
  )
}

export default PokemonCard