import Search from "../Search/Search";
import Pokemonlist from "../pokemonList/PokemonList";
import './pokedex.css';

function Pokedex (){
    return(
         <div className="pokedex-wrapper">
        <h1 id = "h1">Pokedex</h1>
         <Search/>
         <Pokemonlist/>
         </div>
    );
}
export default Pokedex; 