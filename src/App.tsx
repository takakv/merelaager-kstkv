import React, { useState, useEffect } from "react";
import useSound from "use-sound";

import "./App.scss";
import Preloader from "./Preloader";
import Backdrop from "./Backdrop";
import GameScene from "./GameScene";

import introSound from "./assets/sounds/std_intro.mp3";

function App() {
  const [gameStart, setGameStart] = useState(false);

  const [playIntroSound, { stop }] = useSound(introSound);

  const startGame = () => {
    alert("startedGame");
    setGameStart(true);
    stop();
  };

  useEffect(() => {
    const preStart = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        playIntroSound();
        window.removeEventListener("keydown", preStart);
        alert("Playing intro");
      }
    };

    window.addEventListener("keydown", preStart);

    return () => {
      window.removeEventListener("keydown", preStart);
    };
  }, [playIntroSound]);

  return (
    <div className="App">
      <Backdrop isDimmed={gameStart} />
      {gameStart ? <GameScene /> : <Preloader startGame={startGame} />}
    </div>
  );
}

export default App;
