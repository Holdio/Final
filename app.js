import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [error, setError] = useState("");
  const [gymLeader, setGymLeader] = useState([]);
  const [poke1, setPoke1] = useState("");
  const [poke2, setPoke2] = useState("");
  const [poke3, setPoke3] = useState("");
  const [poke4, setPoke4] = useState("");
  const [trainer, setTrainer] = useState("");
  const [type, setType] = useState("normal");

  const fetchGymLeader = async () => {
    try {
      console.log("WORK");
      const response = await axios.get("/pkm/leader/");
      console.log("WORK 2");
      console.log(response.data);
      setGymLeader(response.data.gymLeader);
    }
    catch (error) {
      console.log("error in fetchTasks");
      setError("error retrieving task: " + error);
    }
  };

  const createGymLeader = async (e) => {
    try {
      console.log("Create");
      //await assignPokemon();
      await axios.post("/pkm/leader/", {trainer: e.trainer, type: e.type, poke1: e.poke1, poke2: e.poke2, poke3: e.poke3, poke4: e.poke4});
      await fetchGymLeader();
    }
    catch (error) {
      setError("error adding a task: " + error);
    }
  };
  
  const deleteThisDude = async(task) => {
    try {
      console.log("delete");
      //console.log(task.id)
      await axios.delete("/pkm/leader/" + task.id);
    } catch(error) {
      setError("error deleting taks" + error);
    }
  };

  useEffect(() => {
    fetchGymLeader();
  }, []);

  const newGymLeader = async (e) => {
    //e.preventDefault();
    await createGymLeader();
    await fetchGymLeader();
    setTrainer("");
    setType("normal");
    setPoke1("");
    setPoke2("");
    setPoke3("");
    setPoke4("");
    //assignPokemon();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    
    // await assignPokemon();
    
    // // setPoke1(poke1);
    // // setPoke2(poke2);
    // // setPoke3(poke3);
    // // setPoke4(poke4);

    // const theTrainer = {
    //   trainer: trainer,
    //   type: type,
    //   poke1: poke1,
    //   poke2: poke2,
    //   poke3: poke3,
    //   poke4: poke4
    // };
    
    
  
    // await assignPokemon().then(() => {
    //   const theTrainer = {
    //   trainer: trainer,
    //   type: type,
    //   poke1: poke1,
    //   poke2: poke2,
    //   poke3: poke3,
    //   poke4: poke4
    // };
    // console.log(theTrainer);
    // newGymLeader(theTrainer);
    // });
    // console.log(theTrainer);
    // newGymLeader(theTrainer);
    //assignPokemon();
    
    let ourDude = await assignPokemon();
    
    createGymLeader(ourDude);
    
  };
  
  const deleteTrainer = async(task) => {
    await deleteThisDude(task);
    fetchGymLeader();
  };

  const assignPokemon = async () => {
    
    const url = "https://pokeapi.co/api/v2/type/" + type;
    let pokemon = await axios.get(url);
    console.log(pokemon);
    let max = pokemon.data.pokemon.length;
    
    let rand1 = Math.floor(Math.random() * (max - 0 + 1));
    let rand2 = Math.floor(Math.random() * (max - 0 + 1));
    let rand3 = Math.floor(Math.random() * (max - 0 + 1));
    let rand4 = Math.floor(Math.random() * (max - 0 + 1));
    
    let pokeLink1 = pokemon.data.pokemon[rand1].pokemon.url;
    let pokeLink2 = pokemon.data.pokemon[rand2].pokemon.url;
    let pokeLink3 = pokemon.data.pokemon[rand3].pokemon.url;
    let pokeLink4 = pokemon.data.pokemon[rand4].pokemon.url;
    
    let pokeImg1 = await axios.get(pokeLink1);
    let pokeImg2 = await axios.get(pokeLink2);
    let pokeImg3 = await axios.get(pokeLink3);
    let pokeImg4 = await axios.get(pokeLink4);
    
    let pokemon1 = pokeImg1.data.sprites.front_default;
    let pokemon2 = pokeImg2.data.sprites.front_default;
    let pokemon3 = pokeImg3.data.sprites.front_default;
    let pokemon4 = pokeImg4.data.sprites.front_default;

    // await setPoke1(pokemon1);
    // await setPoke2(pokemon2);
    // await setPoke3(pokemon3);
    // await setPoke4(pokemon4);
  
    console.log(pokemon1);
    console.log(pokemon2);
    console.log(pokemon3);
    console.log(pokemon4);
    
    console.log(poke1);
    
     const theTrainer = {
      trainer: trainer,
      type: type,
      poke1: pokemon1,
      poke2: pokemon2,
      poke3: pokemon3,
      poke4: pokemon4
    };
    
    console.log(theTrainer);
    
    return theTrainer;
  };

  return (
    <div>
    {error}
    <h1>Pokemon Gym Leader Creator</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control" placeholder="Trainer..." 
            value={trainer} onChange={e => setTrainer(e.target.value)} />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option selected value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dark">Dark</option>
          <option value="dragon">Dragon</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
      <center><h1>Gym Leaders:</h1>
      {gymLeader.map(gymLeader => (
            <div key={gymLeader.trainer} className="Item">
                <h2>{gymLeader.trainer}</h2>
                <p><img src = {gymLeader.poke1} alt="react logo"/> <img src = {gymLeader.poke2} alt="react logo"/></p>
                <p><img src = {gymLeader.poke3} alt="react logo"/> <img src = {gymLeader.poke4} alt="react logo"/></p>
                <p><button onClick={e => deleteTrainer(gymLeader)}>Delete</button></p>
            </div>
          ))}
      <a href="https://github.com/Holdio/Planner.git">My Repository</a>
      </center>
    </div>
  );
}

export default App;
