// export default function App() {
//   return (
//     <h1 className="text-3xl font-bold py-2 bg-indigo-600 text-white text-center">
//       Hello world!
//     </h1>
//   );
// }

// At first, we need to import React, useEffect, and useState from the React package.
// Here useState allows managing states in a React app and useEffect is a lifecycle method.
import React, { useState, useEffect } from "react";

// We need to create a function named App and export it. We are going to code everything inside this function. Because our react app is small, it does not need to divide our project as components.
export default function App() {
  // Initialize all the states

  // So we need states to store data. We need to initialize the below states.

  //     list: if the state list is true, the list of players component will be displayed.
  //     card: if the state card is true, the single-player card will be displayed.
  //     players: this state stores the list array of players from the backend.
  //     player: this stores a single-player detail from the backend.
  const [list, setList] = useState(true);
  const [card, setCard] = useState(false);
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({});

  //   Fetch the list of players from API and store it in the state

  // Now we need to fetch the list of players from the API we have created using Express earlier. This data needs to be stored in the state players.

  // This should be done just after mounting the component. So we are using the lifecycle method useEffect.
  useEffect(() => {
    fetch("http://localhost:3001/players/list")
      .then((response) => response.json())
      .then((responseJson) => {
        setPlayers(responseJson.data);
      });
  }, []);

  //   Create a function to handle the view of a single-player card

  // Now we need to create a function showCard() which handles the view of a single-player detail card. Inside this, it needs to fetch each player detail with the id and store it in a state named player.

  // This function can also be used for UI functions. Here we make list value false and card value true. This will hide player’s list view and show a single-player card view.
  let showCard = (id) => {
    fetch(`http://localhost:3001/players/${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setPlayer(responseJson.data);
        setList(false);
        setCard(true);
      });
  };

  //   Create a function to handle the view of the player’s list

  // We have a Back button in card view and pressing it will call a function named showList() where it makes card value false and list value true. This will show players’ list view and hide the single-player card view.
  let showList = () => {
    setCard(false);
    setList(true);
  };

  return (
    <div className="container">
      {list ? (
        <div className="list-group">
          {players.map((player) => (
            <li
              onClick={() => showCard(player._id)}
              className="list-group-item list-group-item-action my-2 bg-indigo-600 text-white hover:text-black"
            >
              {player.name}
            </li>
          ))}
        </div>
      ) : null}
      {card ? (
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">{player.name}</h5>
            <p class="card-text">{player.runs}</p>
            <div onClick={() => showList()} class="btn btn-primary">
              Back
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
