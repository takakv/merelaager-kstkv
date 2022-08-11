import React, { useState } from "react";
import "./App.scss";
import Preloader from "./Preloader";
import Backdrop from "./Backdrop";
import GameScene from "./GameScene";

function App() {
  const [gameStart, setGameStart] = useState(false);

  const startGame = () => {
    setGameStart(true);
  };

  return (
    <div className="App">
      <Backdrop isDimmed={gameStart} />
      {gameStart ? <GameScene /> : <Preloader startGame={startGame} />}
    </div>
  );
}

export default App;
