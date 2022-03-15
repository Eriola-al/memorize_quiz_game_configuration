import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeLevel, reset } from "../redux/action";
import Scores from "./Scores";
import '../styles/game.css'
import Layout from '../layout/layout'

const Game = ({authorised}) => {
  const [scores, setScores] = useState([]);
  const [level, setLevel] = useState();
  const [easyDefault, setEasyDefault] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if(authorised.game === false){
      navigate(`/`)
    }
    const scores = localStorage.getItem("scores");
    if (scores) {
      setScores(JSON.parse(scores));
    }
    dispatch(reset());
  }, []);

  return (
    <Layout>
    <div className="box-container">
      <div className="game-container">
        <p className="description">Memory Game</p>
        <br />
        <div className="contain">
          <div className="level">
            <p className="title">Level</p>

            <button
              className={ level  === "easy" ? "clicked" : "btn" }
              onClick={() => setLevel("easy")}
            >
              Easy
            </button>

            <button
              className={level === "medium" ? "clicked" : "btn"}
              onClick={() => setLevel("medium")}
            >
              Medium
            </button>

            <button
              className={level === "hard" ? "clicked" : "btn"}
              onClick={() => setLevel("hard")}
            >
              Hard
            </button>
          </div>
          <div className="score">
            <p className="title">Scores</p>
            <div style={{ paddingTop: "5px" }}>
              {scores
                .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
                .map((score, index) => <Scores key={index} score={score} />)
                .slice(0, 5)}
            </div>
          </div>
        </div>
        <br />
        <button
          className="play"
          onClick={() => {
            dispatch(changeLevel(level ? level : "easy"));
            setEasyDefault(true);
            navigate(`/puzzle`);
          }}
        >
          Play
        </button>
      </div>
    </div>
    </Layout>
  );
};
export default Game;
