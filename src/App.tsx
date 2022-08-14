import React, { useState, useEffect } from "react";
import useSound from "use-sound";

import "./App.scss";
import Preloader from "./Preloader";
import Backdrop from "./Backdrop";
import GameScene from "./GameScene/GameScene";

import introSound from "./assets/sounds/std_intro.mp3";

function App() {
  const [gameStart, setGameStart] = useState(false);

  const [playIntroSound, { stop }] = useSound(introSound);

  const startGame = () => {
    console.log("Start game");
    setGameStart(true);
    console.log("Stop intro music");
    stop();
  };

  useEffect(() => {
    console.log("Mounted 'App'");
  }, []);

  useEffect(() => {
    const preStart = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log("Playing intro music");
        playIntroSound();
        console.log("Remove intro event listener");
        window.removeEventListener("keydown", preStart);
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
