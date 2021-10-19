import React, { useEffect, useState } from 'react';
import './scss/main.scss';
import pokeballDark from './img/pokeball-dark.png'
import PokemonList from './components/PokemonList'
import PokemonSearch from './components/PokemonSearch'
import PokemonData from './components/PokemonData'

interface Pokemon {
  id: number
  name: string
  types: {
    type: {
      name: string
    }
  }[]
  abilitiesURL: string[] | string
  abilities: {
    ability: {
      url: string
    }
  }[]
  sprites: {
    front_default: string
  }
  effect_entries: {
    effect: string
  }[]
}

interface NewPokemon {
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

export interface IState {
  pokemons: {
    id: number
    name: string
    type: string
    abilitiesURL: string[] 
    abilities: {
      abilityName: string
      abilityDes: string
    }[]
    image: string
  }[],
  pokemonData: {
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

const App = () => {

  const [pokemons, setPokemons] = useState<IState['pokemons']>([])
  const [pokemonsBackUp, setPokemonsBackUp] = useState<IState['pokemons']>([])
  const [pokemonData, setPokemonData] = useState<IState['pokemonData']>({
    id: 3,
    name: 'dummy name',
    type: 'dummy type',
    abilitiesURL: ['dummy ability url'],
    abilities: [
      {
        abilityName: 'dummy ability name',
        abilityDes: 'dummy ability description'
      }
    ],
    image: 'dummy url image'
  })

  const getPokemonCount = async ():Promise<{count: number}> => {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon/')
    return await data.json()
  } 

  const getPokemonData = async (count:number):Promise<Pokemon | undefined> => {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
      return await data.json()
    } catch(e) {
      console.log(e)
    }
  }

  const getPokemonAbility = async(URL:string):Promise<{name: string; effect_entries: { effect: string }[]}> => {
    const data = await fetch(URL)
    return await data.json()
  }

  const processPokemon = async (pokemonData:Pokemon, i:number) => {
    let newPokemon:NewPokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      type: pokemonData.types[0].type.name,
      abilitiesURL: [],
      abilities: [],
      image: pokemonData.sprites.front_default
    },
    pokemonAbilities = pokemonData.abilities

    for(let i=0; i<pokemonAbilities.length; i++){
      newPokemon.abilitiesURL.push(pokemonAbilities[i].ability.url)
    }

    for(let i=0; i<newPokemon.abilitiesURL.length; i++){
      const pokemonAbility = await getPokemonAbility(newPokemon.abilitiesURL[i])

      newPokemon.abilities.push({
        abilityName: pokemonAbility.name,
        abilityDes:  pokemonAbility.effect_entries.length > 1 ?
                      pokemonAbility.effect_entries[0].effect || pokemonAbility.effect_entries[1].effect || 'none' :
                      'none'
      })
    }

    return await newPokemon
    console.log(i)
  }

  const throwError = (i:number) => {
    throw new Error("Error 404 Pokemon not found:" + i);
  }

  useEffect(() => {

    const getData = async () => {
      try {
        const pokemonAPIData = await getPokemonCount()
        const pokemonList:IState['pokemons'] = []

        // use pokemonAPIData.count instead of 5
        for(let i=1; i < 805; i++){
          const pokemonData = await getPokemonData(i)
          pokemonData ? pokemonList.push(await processPokemon(pokemonData, i)) : throwError(i)
        }

        setPokemons([...pokemons, ...pokemonList])
        setPokemonsBackUp([...pokemonsBackUp, ...pokemonList])

        const webLoader = document.querySelector('.web-loader')
        webLoader && webLoader.classList.add('web-loader--done') 

      } catch(e) {
        console.log(e)
      }
    }

    getData()

  }, [])

  return (
    <div className="container">
      <div className="web-loader">
        <img className="pokeball" src={pokeballDark} alt="pokeball"/>
        <p className="text text--20"> catching pokemons... </p>
      </div>
      <PokemonData pokemonData={pokemonData}/>
      <PokemonSearch pokemons={pokemons} setPokemons={setPokemons} pokemonsBackup={pokemonsBackUp}/>
      <PokemonList setPokemonData={setPokemonData} pokemons={pokemons} />
    </div>
  )
}

export default App;
