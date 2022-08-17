import AnswerBox from "./AnswerBox";

interface AnswerGridProps {
  questionIndex: number;
  answers: string[];
  halfLifelineCount: number;
  onHalfLifelineClick: () => void;
  onClick: () => void;
}

const AnswerGrid = ({
  questionIndex,
  answers,
  halfLifelineCount,
  onHalfLifelineClick,
  onClick,
}: AnswerGridProps) => {
  const answerBoxes = [];
  for (let i = 0; i < 4; ++i) answerBoxes.push(AnswerBox);

  return (
    <div className="AnswerGrid">
      {Array.from({ length: 4 }, (_, k) => (
        <AnswerBox
          halfLifelineCount={halfLifelineCount}
          onHalfLifelineClick={onHalfLifelineClick}
          onClick={() => onClick()}
          key={k}
          questionIndex={questionIndex}
          index={k}
          answer={answers[k]}
        />
      ))}
    </div>
  );
};

export default AnswerGrid;
