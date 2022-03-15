import React from "react";
import moment from "moment";
import '../styles/game.css'

const Scores = ({ score }) => {
  // const style = { color: "rgba(212,175,55, 0.8)", marginRight: "15px" };

  return (
    <div className="scores">
      Score: {score.score} , level: {score.level} ,{" "}
      {moment(score.timestamp).format("LT")}
    </div>
  );
};
export default Scores;