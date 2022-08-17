import { useEffect, useState, createContext } from "react";
import useSound from "use-sound";

import AnswerGrid from "./AnswerGrid";
import "./GameScene.scss";
import { OneHalfContext } from "./contexts";

import questionBox from "../assets/images/question_box.png";
import questions from "../assets/qna.json";
import newSound from "../assets/sounds/std_new_question.mp3";
import thinkSound from "../assets/sounds/std_think.mp3";

import removeHalf from "../assets/images/lifelines/remove_half.png";
import askAudience from "../assets/images/lifelines/ask_audience.png";
import phoneCall from "../assets/images/lifelines/phone_call.png";

const GameContext = createContext(true);

interface SoundProps {
  number: number;
}

interface HalfLifelineProps {
  handleHalfClick: () => void;
}

const HalfLifeline = ({ handleHalfClick }: HalfLifelineProps) => {
  const [isUsed, setIsUsed] = useState(false);

  const handleClick = () => {
    setIsUsed(true);
    handleHalfClick();
  };

  return (
    <img
      className={isUsed ? "dimmed" : ""}
      src={removeHalf}
      alt="50:50 lifeline"
      onClick={() => handleClick()}
    />
  );
};

interface StdLifelineProps {
  source: string;
  alt: string;
}

const StdLifeline = ({ source, alt }: StdLifelineProps) => {
  const [isUsed, setIsUsed] = useState(false);

  const handleClick = () => {
    setIsUsed(true);
  };

  return (
    <img
      className={isUsed ? "dimmed" : ""}
      src={source}
      alt={alt}
      onClick={handleClick}
    />
  );
};

interface LifelinesProps {
  handleHalfClick: () => void;
}

const Lifelines = ({ handleHalfClick }: LifelinesProps) => {
  return (
    <div className="Lifelines">
      <HalfLifeline handleHalfClick={handleHalfClick} />
      <StdLifeline source={askAudience} alt="Ask audience lifeline" />
      <StdLifeline source={phoneCall} alt="Phone call lifeline" />
    </div>
  );
};

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

interface GameSceneProps {
  initialStop: () => void;
}

const GameScene = ({ initialStop }: GameSceneProps) => {
  const [qIndex, setQIndex] = useState(0);
  const [isInitial, setIsInitial] = useState(true);
  const [isFirstClick, setIsFirstClick] = useState(true);

  // Lifeline stuff
  const [halfLifelineIsUsed, setHalfLifelineIsUsed] = useState(0);
  const [halfLifelineCount, setHalfLifelineCount] = useState(-1);

  const [playNewSound] = useSound(newSound, { interrupt: false });
  const [playThinkSound, { stop }] = useSound(thinkSound, { interrupt: true });

  useEffect(() => {
    console.log("Mounted 'GameScene'");
  }, []);

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
      setIsFirstClick(true);
      nextQuestion();
    }
  };

  const onClick = () => {
    if (isInitial) {
      setIsInitial(false);
      initialStop();
    } else stop();
    setIsFirstClick(false);
    window.addEventListener("keydown", moveForward);
  };

  const oneHalfLifeline = () => {
    if (halfLifelineIsUsed !== 0) return;
    setHalfLifelineIsUsed(1);
    setHalfLifelineCount(0);
  };

  const onHalfLifelineClick = () => {
    setHalfLifelineCount(halfLifelineCount + 1);
  };

  return (
    <OneHalfContext.Provider value={halfLifelineIsUsed}>
      <GameContext.Provider value={isFirstClick}>
        <div className="GameScene">
          <QuestionBox question={questions[qIndex].question} />
          <AnswerGrid
            onClick={() => onClick()}
            questionIndex={qIndex}
            answers={questions[qIndex].answers}
            halfLifelineCount={halfLifelineCount}
            onHalfLifelineClick={onHalfLifelineClick}
          />
          <Lifelines handleHalfClick={oneHalfLifeline} />
        </div>
      </GameContext.Provider>
    </OneHalfContext.Provider>
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
