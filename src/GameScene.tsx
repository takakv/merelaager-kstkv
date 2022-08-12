import { useState } from "react";
import useSound from "use-sound";

import "./GameScene.scss";

import questionBox from "./assets/images/question_box.png";
import answerBox from "./assets/images/answer_box.png";
import questions from "./assets/qna.json";
import loseSound from "./assets/sounds/std_lose.mp3";
import winSound from "./assets/sounds/std_win.mp3";
import newSound from "./assets/sounds/std_new_question.mp3";
import thinkSound from "./assets/sounds/std_think.mp3";

const GameScene = () => {
  const [qIndex, setQIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState([-1, -1]);

  const [playNewSound] = useSound(newSound);
  const [playThinkSound, { stop }] = useSound(thinkSound);

  const startQuestion = () => {
    playNewSound();

    setTimeout(() => {
      playThinkSound();
    }, 5500);
  };

  startQuestion();

  const moveForward = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      window.removeEventListener("keydown", moveForward);
      setQIndex(qIndex + 1);
      setCorrectIndex([-1, -1]);
      startQuestion();
    }
  };

  const handleClick = (index: number) => {
    setCorrectIndex([questions[qIndex].answerIndex - 1, index]);
    stop();
    window.addEventListener("keydown", moveForward);
  };

  return (
    <div className="GameScene">
      <QuestionBox question={questions[qIndex].question} />
      <AnswerGrid
        answers={questions[qIndex].answers}
        handleClick={handleClick}
        correctIndex={correctIndex}
      />
    </div>
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

interface AnswerGridProps {
  answers: string[];
  correctIndex: number[];
  handleClick: (i: number) => void;
}

const AnswerGrid = ({
  answers,
  correctIndex,
  handleClick,
}: AnswerGridProps) => {
  const answerBoxes = [];
  for (let i = 0; i < 4; ++i) answerBoxes.push(AnswerBox);

  return (
    <div className="AnswerGrid">
      {Array.from({ length: 4 }, (_, k) => (
        <AnswerBox
          key={k}
          index={k}
          answer={answers[k]}
          handleClick={handleClick}
          correctIndex={correctIndex}
        />
      ))}
    </div>
  );
};

interface AnswerBoxProps {
  index: number;
  answer: string;
  correctIndex: number[];
  handleClick: (i: number) => void;
}

const AnswerBox = ({
  index,
  answer,
  correctIndex,
  handleClick,
}: AnswerBoxProps) => {
  const [playLoseSound] = useSound(loseSound);
  const [playWinSound] = useSound(winSound);
  const classList = ["AnswerBox"];

  if (correctIndex[0] !== -1 && correctIndex[1] === index) {
    if (correctIndex[0] === index) {
      classList.push("correct");
      playWinSound();
    } else {
      classList.push("incorrect");
      playLoseSound();
    }
  }

  return (
    <div className={classList.join(" ")} onClick={() => handleClick(index)}>
      <span>{String.fromCharCode("A".charCodeAt(0) + index)}</span>
      <p className="answer">{answer}</p>
      <img src={answerBox} alt="Vastus kast" />
    </div>
  );
};

export default GameScene;
