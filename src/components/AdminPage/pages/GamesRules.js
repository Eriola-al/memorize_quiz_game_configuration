import React, { useEffect, useState } from "react";
import { Button, Input, Radio, Space } from "antd";
import "../styles/AdminPage.css";

const GameRules = () => {
  const [level, setLevel] = useState("easy");
  const [levelsData, setLevelsData] = useState({
    easy: {
      timeout: 4000,
      slices: 2,
      wrongAnswers: 1,
    },
    medium: {
      timeout: 3000,
      slices: 3,
      wrongAnswers: 1,
    },
    hard: {
      timeout: 2000,
      slices: 4,
      wrongAnswers: 0,
    },
  });


  const handleRadioGroupChange = (event) => {
    setLevel(event.target.value);
  };

  const handleChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newForm = {
      ...levelsData,
      [level]: { ...levelsData[level], [fieldName]: fieldValue },
    };

    setLevelsData(newForm);
  };

  const handleSubmit = (level) => {
    const newlevel = {
      timeout: levelsData.timeout,
      slices: levelsData.slices,
      wrongAnswers: levelsData.wrongAnswers,
    }

    (Object.keys(levelsData).map((levelData) => {
        if (levelData === level) {
          setLevelsData({ ...levelsData, [levelData]: { newlevel } });
        }
      })
    );
  };

  useEffect(() => {
    const data = levelsData;
    localStorage.setItem("gameRules", JSON.stringify(data));
  }, [levelsData]);

  return (
    <div className="game-rules">
      <h3 style={{ textAlign: "center" }}>Game Rules</h3>
      <Space direction="vertical" className="edit-game">
        <Radio.Group value={level} onChange={handleRadioGroupChange}>
          <Radio value="easy">Easy</Radio>
          <Radio value="medium">Medium</Radio>
          <Radio value="hard">Hard</Radio>
        </Radio.Group>
        Timeout :{" "}
        <Input
          name="timeout"
          onChange={handleChange}
          value={levelsData[level].timeout}
        />
        Slices :{" "}
        <Input
          name="slices"
          onChange={handleChange}
          value={levelsData[level].slices}
        />
        Wrong Answers allowed :{" "}
        <Input
          name="wrongAnswers"
          onChange={handleChange}
          value={levelsData[level].wrongAnswers}
        />
        <br />
        <Button type={"primary"} onSubmit={handleSubmit}>
          Save
        </Button>
      </Space>
    </div>
  );
};
export default GameRules;
