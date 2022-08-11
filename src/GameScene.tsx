import questionBox from "./assets/images/question_box.png";
import answerBox from "./assets/images/answer_box.png";
import questions from "./assets/qna.json";
import "./GameScene.scss";
import { useState } from "react";

const GameScene = () => {
  const [qIndex, setQIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState([-1, -1]);

  const handleClick = (index: number) => {
    setCorrectIndex([questions[qIndex].answerIndex - 1, index]);
    setTimeout(() => {
      setQIndex(qIndex + 1);
      setCorrectIndex([-1, -1]);
    }, 2000);
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
  const classList = ["AnswerBox"];
  if (correctIndex[0] !== -1 && correctIndex[1] === index) {
    classList.push(correctIndex[0] === index ? "correct" : "incorrect");
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
