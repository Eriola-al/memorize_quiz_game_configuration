import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "../redux/action";
import '../styles/quiz.css'
import { IoCloseCircle } from "react-icons/io5";
import Layout from '../layout/layout';

const Quiz = ({ authorised }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const score = useSelector((state) => state.score);
  const level = useSelector((state) => state.level);
  const [chances, setChances] = useState(0);
  const [showColoredAnswers, setColoredAnswers] = useState(false);
  const [selected, setSelected] = useState();
const [questions , setQuestions] = useState([{ title: null , answer : null , choices : []}]);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(authorised.game === false){
      navigate(`/`)
    }
    const question = localStorage.getItem('questions');
    const questionsAre = JSON.parse(question);
    setQuestions(questionsAre)
  }, [])

  const handleClick = (choice) => {
    setSelected(choice.key);
    let isCorrectAnswer = choice.key === questions[questionIndex].answer;

    if (isCorrectAnswer) {
      dispatch(addScore());
      setChances(0);
    }

    if (level === "easy" && !isCorrectAnswer && chances < 1) {
      setColoredAnswers(true);
      setChances(chances + 1);
      return;
    }

    if (chances >= 1 || isCorrectAnswer) {
      setColoredAnswers(false);
      setChances(0);
    }


    const nextQuestion = questionIndex + 1;
    if (nextQuestion < questions.length) {
      setQuestionIndex(nextQuestion);
    } else {
      let scores = score;
      if (questionIndex === (questions.length-1) && isCorrectAnswer) {
        scores = scores + 1;
      }
      const scoresRaw = localStorage.getItem("scores");
      const scoresLocalStr = JSON.parse(scoresRaw);
      const scoreObj = { score: scores, level, timestamp: new Date() };
      let arr = scoresLocalStr ? [...scoresLocalStr, scoreObj] : [scoreObj];
      localStorage.setItem("scores", JSON.stringify(arr));
      navigate(`/result`);
    }
  };

  return (
      <Layout>
        <div className="quiz-container">
          <div className="quiz">
            <p className="question">{questions[questionIndex]?.title}</p>
            <div>
              <div className="answers">
                {questions[questionIndex]?.choices.map((choice) => {
                  const correctAnswer =
                      questions[questionIndex].answer === selected;

                  const isSelected = selected === choice.key;

                  const correct = correctAnswer && isSelected;

                  let classes;
                  if (isSelected && !correct && showColoredAnswers)
                    classes = "wrong-answer";
                  else classes = "answer-btn";

                  return (
                      <button
                          key={choice.key}
                          className={classes}
                          onClick={() =>
                              handleClick(choice, questions[questionIndex].answer)
                          }
                      >
                        <div
                            style={{ display: "flex", justifyContent: "space-between" }}
                        >
                          {choice.key.toUpperCase() + "."} {choice.title}
                          {isSelected && !correct && showColoredAnswers && (
                              <IoCloseCircle />
                          )}
                        </div>
                      </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout> )
}

export default Quiz;