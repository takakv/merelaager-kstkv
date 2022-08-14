import AnswerBox from "./AnswerBox";

interface AnswerGridProps {
  questionIndex: number;
  answers: string[];
  onClick: () => void;
}

const AnswerGrid = ({ questionIndex, answers, onClick }: AnswerGridProps) => {
  const answerBoxes = [];
  for (let i = 0; i < 4; ++i) answerBoxes.push(AnswerBox);

  return (
    <div className="AnswerGrid">
      {Array.from({ length: 4 }, (_, k) => (
        <AnswerBox
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
