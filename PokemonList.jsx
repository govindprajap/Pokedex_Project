import { useEffect, useState } from "react";
import axios from 'axios'
import './pokemonList.css';
import Pokemon from "../Pokemon/Pokemon";



function Pokemonlist(){
    const [pokemonList, setPokemonList] = useState([])
    const [isLoding, setLoading] = useState(true);
    async function downloadPokemons(){
        const responce = await axios.get('https://pokeapi.co/api/v2/pokemon');//this  download 20 pokemon list
        const pokemonResult = responce.data.results;   //  we get the array of pokemons from result
        const pokemonResultPromise = pokemonResult.map((pokemon)=>axios.get(pokemon.url))
        // console.log(pokemonResultPromise)
        const pokemonData = await axios.all(pokemonResultPromise)
        
        console.log(pokemonData)
        // Itraring the array of pokemon and using their url to create the array of promise those download 20 image;
       
        const res = (pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data
            return {
                   id: pokemon.id,
                   name: pokemon.name,
                   image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.front_shiny,
                   types:pokemon.types
                }
        }))
        console.log(res);
        setPokemonList(res)
        setLoading(false);

    }
    useEffect(()=>{
        downloadPokemons()
        

    },[])
    
    return(
        <div className="pokemonList-wrapper">
        <div>Pokemonlist</div>
        <div className="pokemon-wrapper">
        {(isLoding) ? "loading....." :
           pokemonList.map((p)=><Pokemon name = {p.name} image = {p.image} key = {p.id}/>)
         }
        </div>
        


        </div>
    );
}
export default Pokemonlist;