import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pokecarga from "../img/pokecarga.png";
import pokemon from '../img/pokemon.png'

import "./style.css";

function Pokemon() {
  const [result, guardarApiData] = React.useState([]); //guarda la data 
  const [pokeData, guardarPokeData] = React.useState([]);// la peticion encadenada para obtener los datos del pokemon
  const [cargarApi, cambiarEstadoApi] = React.useState("true"); //para obtener un loading 
  const [evolucionesData, guardarEvoluciones] = React.useState([]);//obtenemos las evoluciones de los pokemon
  const [search, setSearch] = useState(""); 
  const [filtrarPokemon, setFiltroPokemon] = useState([]);
  const pokemons = []; //array donde vamos a guardar los pokemons.
  const evoluciones = [];


  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=25")
      .then((response) => response.json())
      .then((data) =>
        guardarApiData(
          data.results.map((item) => { //realizando la peticion encadenada 
            fetch(item.url) 
              .then((response) => response.json()) //promesa donde convertimos la respuesta en un json
              .then((pokes) => {
                pokemons.push(pokes); //añadiendo pokemon al array 
                fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokes.id)//haciendo una peticón  con el id de cada pokemon para obtener la evolución
                  .then((respuesta) => respuesta.json())
                  .then((evolucion) => evoluciones.push(evolucion)); //promesa que agrega la evolución del pokemon en el array evoluciones.
              });
            guardarPokeData(pokemons); //guardamos la información de los pokemones en el array pokemons
            guardarEvoluciones(evoluciones);//guardamos  la información de las evoluciones en  el array evoluciones
            setFiltroPokemon(pokemons); //guardamos la información en filtrarpokemon 
          }),
          console.log(evolucionesData)
        )
      );
 
  }, []);

   useEffect(() => { //estamos filtrando el pokemon por su nombre mediante filer.
    setFiltroPokemon(
         pokeData.filter(pokemon =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
            
          )
        );
    }, [search, pokeData]); 



  setTimeout(() => {
    cambiarEstadoApi(false); // cambiba el estado de  cargarapi a false
  }, 1000);

  return ( //renderizamos nuestros pokemoncitos 
    <div className="container list">
        <div className="Container text-center">
        <img class="img-fluid banner" alt="Responsive image" src={pokemon}></img>
        <br></br>
        <br></br>
    
        <input className="buscador"
        type="text" className="text-center"
        placeholder="Buscar  pokemon"
        onChange={(e) => setSearch(e.target.value)} 
      />

        </div>
     
      <div className="container text-left containerCard list mr-4">
        <div className="row">
          {cargarApi ? ( //ternario  donde validamos que si está cargando los datos, aparezca lo siguiente:
              <>
              <div className="container pokeinfo text-center">
                <h3>Cargando PokeDex, por favor espera...</h3>
              <img className="pokebola img-responsive mg-fluid" alt="Responsive image" src={pokecarga}></img>
                </div>
                </>
          ) : ( 
            filtrarPokemon.map((pokemon, i) => ( //map donde nos pinta cada pokemon con su respectiva información
              <div id={pokemon.id} key={pokemon.id}>   {/* dandole un id */}
                <div className="container cardpoke mt-4">
                  <div className="imagenes">
                    <img src={pokemon.sprites.front_default} alt="pokemon" />  {/* obteniendo imagen del pokemon */}
                  </div>
                  <hr></hr>
                  <div className="info">
                    <p className="nombre">
                      # 00{pokemon.id.toString().padStart(3, "0")} {/* poniendole 0's adelante del numero para que parezca una pokedex rial no fake */}
                    </p>
                    <h4>{pokemon.name}</h4> {/*obteniendo el nombre del pokemon  */}

                    <button className="tipo">
                      {pokemon.types.map((tipo, i) => tipo.type.name + " / ")} {/*obteniendo  de qué tipo es el pokemon */}
                    </button>
                    <h6>
                      Evolución:{" "}  
                      {evolucionesData[i].evolves_from_species == null  /* condición para la evolución  i es el index donde nos indica en qué  posición va para poder mostrar la respectiva evolución*/
                        ? "No posee evolución"
                        : evolucionesData[i].evolves_from_species.name}
                    </h6>
                  </div>
                  <Link to={"/info/" + pokemon.id}>  {/* enviando por props el id del pokemon para acceder a su información más detallada */}
                    <button type="button " className="btn btn-danger mt-2">
                      Más información
                    </button>
                  </Link>
                  <br />
                  <br />
                  <hr></hr>
                </div>
                <br />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Pokemon;
