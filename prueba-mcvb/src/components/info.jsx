import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import pokecarga from "../img/pokecarga.png";

function InfoPoke(props) {
  //recibimos las props

  const [pokeData, guardarPokeData] = React.useState([]);
  const [cargarApi, cambiarEstadoApi] = React.useState("true");
  const pokemons = [];
  const pokemonId = props.match.params.pokeId; //estamos asignando una variable con el id del pokemon donde vaya el .map

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId) //petición con la url del pokemon
      .then((response) => response.json())
      .then((pokes) => pokemons.push(pokes));
    guardarPokeData(pokemons);
  }, []);

  setTimeout(() => {
    cambiarEstadoApi(false);
  }, 1000);

  return (
    <div>
      <div className="container-fluid">
        {cargarApi ? (
          <>
            <div className="container pokeinfo text-center">
              <h3>Consultando información del pokemon, por favor espere...</h3>
              <img
                alt="Responsive image"
                className="pokebola"
                src={pokecarga}
              ></img>
            </div>
          </>
        ) : (
          pokeData.map((pokemon, i) => (
            <div className="container bg-white ">
              <div id={pokemon.id} key={pokemon.id}>
                <div className="container col-12 col-md-12 text-center">
                  <h1>Información detallada de {pokemon.name}</h1>
                </div>

                <div className="container row">
                  <div className="col-12 col-md-4 text-center ">
                    <img
                      className="img"
                      src={pokemon.sprites.front_default}
                      alt="pokemon"
                    />
                  </div>
                  <div className="col-12 col-md-6 ml-8 mt-2 ml-3 container-info">
                    <h5>Número: {pokemon.id}</h5>
                    <h5>Altura: {pokemon.height / 10} m</h5>
                    <h5>Peso: {pokemon.weight / 10} kg</h5>
                    <h5>
                      Tipo:{" "}
                      {pokemon.types.map((tipo, i) => tipo.type.name + " / ")}
                    </h5>
                    <h5>
                      Habilidades:{" "}
                      {pokemon.abilities.map(
                        (habilidad, i) => habilidad.ability.name + " / "
                      )}
                    </h5>
                  </div>
                </div>
                <div className="container col-12 col-md-12 text-center">
                  <h1>Otras aparencias</h1>
                </div>
                <div className="container row">
                  <div className="col-12 col-md-6  container-aparienciasc text-center ">
                    <h3>Masculino:</h3>
                    <img
                      className="img"
                      src={pokemon.sprites.back_default}
                      alt="pokemon"
                    />
                    <img
                      className="img"
                      src={pokemon.sprites.front_default}
                      alt="pokemon"
                    />
                  </div>
                  <hr></hr>
                  <div className="col-12 col-md-6  container-aparienciasc text-center">
                    <h3>Shiny:</h3>

                    {pokemon.sprites.back_shiny == null ? (
                      "No posee"
                    ) : (
                      <img
                        className="img"
                        src={pokemon.sprites.back_shiny}
                        alt="pokemon"
                      />
                    )}

                    {pokemon.sprites.front_shiny == null ? (
                      ""
                    ) : (
                      <img
                        className="img"
                        src={pokemon.sprites.front_shiny}
                        alt="pokemon"
                      />
                    )}
                  </div>
                </div>
              </div>
              <Link to={"/"}>
                <button
                  type="button"
                  className="btn btn-danger text-right mt-2 ml-5"
                >
                  Volver
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InfoPoke;
