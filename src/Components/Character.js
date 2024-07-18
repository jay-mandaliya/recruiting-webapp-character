import { useState } from "react";
import { MAX_ATTRIBUTE_WEIGHT, SKILL_LIST } from "../consts.js";
import AttributesCard from "./AttributesCard.js";
import ClassCard from "./ClassCard.js";
import SkillCard from "./SkillCard.js";
import {
  getTotalWeight,
  calculateMaxPoints,
  calculateAbilityModifier,
  getTotalSkillPoints,
} from "../Utils/utils.js";
import "../App.css";

function Character({ data, index, onCharacterUpdate }) {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  let maxSkillsPoints = calculateMaxPoints(
    data.attributes["Intelligence"].weight
  );

  function handleAttribute(attribute, increment) {
    if (increment) {
      if (getTotalWeight(data.attributes) >= MAX_ATTRIBUTE_WEIGHT) return;
      data.attributes[attribute].weight++;
    } else {
      if (data.attributes[attribute].weight <= 0) return;
      data.attributes[attribute].weight--;
    }
    onCharacterUpdate(index, { ...data });
  }

  function handleSkillsPoints(skill, increment) {
    if (increment) {
      if (getTotalSkillPoints(data.skills) + 1 > maxSkillsPoints) return;
      data.skills[skill].points++;
    } else {
      if (data.skills[skill].points <= 0) return;
      data.skills[skill].points--;
    }
    onCharacterUpdate(index, { ...data });
  }

  function handleSkillCheck() {
    let num = Math.floor(Math.random() * 20) + 1;
    setRandomNumber(num);
  }

  return (
    <div
      style={{
        margin: 25,
        padding: 25,
        border: "dotted",
      }}
    >
      <h1>{"Character " + (index + 1)}</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <AttributesCard
          attributes={data.attributes}
          onChangeAttribute={handleAttribute}
        />

        <ClassCard attributes={data.attributes} />

        <SkillCard
          attributes={data.attributes}
          skills={data.skills}
          maxSkillsPoints={maxSkillsPoints}
          onSkillsPointsChange={handleSkillsPoints}
        />
      </div>

      <div className="container">
        <h2>Skill Check</h2>

        <span>
          Select a Skill :{" "}
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            {Object.keys(data.skills).map((skill) => {
              return <option value={skill}>{skill}</option>;
            })}
          </select>
        </span>

        <span>
          DC:{" "}
          <input
            type="number"
            value={dc}
            onChange={(e) => setDc(e.target.value)}
          />
        </span>

        <span>
          <button onClick={handleSkillCheck}>Roll</button>
        </span>

        <div
          style={{
            marginTop: 20,
            display: randomNumber === 0 ? "none" : "block",
          }}
        >
          <span>Random Number : {randomNumber}</span>

          <span>
            Result:{" "}
            {data.skills[selectedSkill].points +
              calculateAbilityModifier(
                data.attributes[data.skills[selectedSkill].modifier].weight
              ) +
              randomNumber >=
            dc
              ? "Success"
              : "Failure"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Character;
