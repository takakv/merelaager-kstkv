import questionBox from "./assets/images/question_box.png";
import answerBox from "./assets/images/answer_box.png";
import "./GameScene.scss";

const GameScene = () => {
  return (
    <div className="GameScene">
      <QuestionBox />
      <AnswerGrid />
    </div>
  );
};

const QuestionBox = () => {
  return (
    <div className="QuestionBox">
      <h1>Küsimus</h1>
      <img src={questionBox} alt="Küsimuse kast" />
    </div>
  );
};

const AnswerGrid = () => {
  const answerBoxes = [];
  for (let i = 0; i < 4; ++i) answerBoxes.push(AnswerBox);

  return (
    <div className="AnswerGrid">
      {Array.from({ length: 4 }, (_, k) => (
        <AnswerBox
          key={k}
          letter={String.fromCharCode("A".charCodeAt(0) + k)}
        />
      ))}
    </div>
  );
};

interface AnswerBoxProps {
  letter: string;
}

const AnswerBox = ({ letter }: AnswerBoxProps) => {
  return (
    <div className="AnswerBox">
      <span>{letter}</span>
      <p className="answer">Vastus</p>
      <img src={answerBox} alt="Vastus kast" />
    </div>
  );
};

export default GameScene;
