import { useEffect, useState } from "react";
import questions from "../assets/qna.json";

export const useQuestionStatus = (questionId: number, answerIndex: number) => {
  const [isCorrect, setIsCorrect] = useState(-1);

  useEffect(() => {
    const correctIndex = questions[questionId].answerIndex - 1;
    setIsCorrect(answerIndex === correctIndex ? 1 : 0);
  }, [questionId, answerIndex]);

  return isCorrect;
};
