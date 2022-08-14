import { useEffect, useState, createContext } from "react";
import useSound from "use-sound";

import AnswerGrid from "./AnswerGrid";
import "./GameScene.scss";

import questionBox from "../assets/images/question_box.png";
import questions from "../assets/qna.json";
import newSound from "../assets/sounds/std_new_question.mp3";
import thinkSound from "../assets/sounds/std_think.mp3";

const GameContext = createContext(0);

interface SoundProps {
  number: number;
}

const Sound = ({ number }: SoundProps) => {
  const [initialLaunch, setInitialLaunch] = useState(true);

  const [playNewSound] = useSound(newSound, { interrupt: false });
  const [playThinkSound] = useSound(thinkSound);

  useEffect(() => {
    console.log("Mounted 'Sound'");
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (initialLaunch) {
      setInitialLaunch(false);
      console.log("Playing new sound");
      playNewSound();

      timer = setTimeout(() => {
        playThinkSound();
      }, 5200);
    }

    return () => {
      console.log("Unmounting 'Sound'");
      if (!initialLaunch) clearTimeout(timer);
    };
  }, [initialLaunch, number, playNewSound, playThinkSound]);

  return null;
};

const GameScene = () => {
  const [qIndex, setQIndex] = useState(0);
  const [initialLaunch, setInitialLaunch] = useState(true);

  useEffect(() => {
    console.log("Mounted 'GameScene'");
  }, []);

  const [playNewSound] = useSound(newSound, { interrupt: false });
  const [playThinkSound, { stop }] = useSound(thinkSound, { interrupt: true });

  useEffect(() => {
    // if (initialLaunch) {
    setInitialLaunch(false);
    console.log("Playing new sound");
    playNewSound();

    setTimeout(() => {
      console.log("Playing think sound");
      playThinkSound();
    }, 5200);
    //}
  }, [initialLaunch, playNewSound, playThinkSound]);

  const nextQuestion = () => {
    console.log("Playing new sound");
    playNewSound();

    setTimeout(() => {
      console.log("Playing think sound");
      playThinkSound();
    }, 5200);
  };

  const moveForward = (e: KeyboardEvent) => {
    console.log("Attempt moving forward");
    if (e.key === "Enter") {
      window.removeEventListener("keydown", moveForward);
      setQIndex(qIndex + 1);
      nextQuestion();
    }
  };

  const onClick = () => {
    stop();
    window.addEventListener("keydown", moveForward);
  };

  return (
    <GameContext.Provider value={qIndex}>
      <div className="GameScene">
        <QuestionBox question={questions[qIndex].question} />
        <AnswerGrid
          onClick={() => onClick()}
          questionIndex={qIndex}
          answers={questions[qIndex].answers}
        />
      </div>
    </GameContext.Provider>
  );
};

interface QuestionBoxProps {
  question: string;
}

const QuestionBox = ({ question }: QuestionBoxProps) => {
  return (
    <div className="QuestionBox">
      <h1>{question}</h1>
      <img src={questionBox} alt="Küsimuse kast" />
    </div>
  );
};

export default GameScene;
