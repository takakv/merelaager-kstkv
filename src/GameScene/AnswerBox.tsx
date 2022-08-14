import { useEffect, useState } from "react";
import useSound from "use-sound";
import { useQuestionStatus } from "./Questions";

import loseSound from "../assets/sounds/std_lose.mp3";
import winSound from "../assets/sounds/std_win.mp3";
import answerBox from "../assets/images/answer_box.png";

interface AnswerBoxProps {
  questionIndex: number;
  index: number;
  answer: string;
  onClick: () => void;
}

const AnswerBox = ({
  questionIndex,
  index,
  answer,
  onClick,
}: AnswerBoxProps) => {
  const [playLoseSound] = useSound(loseSound);
  const [playWinSound] = useSound(winSound);

  const [className, setClassName] = useState("");

  const isCorrect = useQuestionStatus(questionIndex, index);

  useEffect(() => {
    setClassName("AnswerBox");
  }, [questionIndex]);

  const handleOnClick = () => {
    if (isCorrect === -1) return;
    onClick();

    if (isCorrect === 1) {
      setClassName(`${className} correct`);
      playWinSound();
    } else if (isCorrect === 0) {
      setClassName(`${className} incorrect`);
      playLoseSound();
    }
  };

  return (
    <div className={className} onClick={() => handleOnClick()}>
      <span>{String.fromCharCode("A".charCodeAt(0) + index)}</span>
      <p className="answer">{answer}</p>
      <img src={answerBox} alt="Vastus kast" />
    </div>
  );
};

export default AnswerBox;
