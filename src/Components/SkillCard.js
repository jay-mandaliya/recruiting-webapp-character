import { calculateAbilityModifier } from "../Utils/utils.js";

function SkillCard({
  attributes,
  skills,
  maxSkillsPoints,
  onSkillsPointsChange,
}) {
  return (
    <div>
      <h2>Skills</h2>

      <h4>Max Points : {maxSkillsPoints}</h4>

      <table>
        <tbody>
          {Object.keys(skills).map((skill) => {
            return (
              <tr key={skill} style={{ marginBottom: 15 }}>
                <td>{skills[skill].name}</td>
                <td>
                  <button onClick={() => onSkillsPointsChange(skill, false)}>
                    -
                  </button>{" "}
                  {skills[skill].points}{" "}
                  <button onClick={() => onSkillsPointsChange(skill, true)}>
                    +
                  </button>
                </td>
                <td>
                  <i style={{ color: "grey" }}>
                    (Attribute Modifier: {skills[skill].modifier} [
                    {calculateAbilityModifier(
                      attributes[skills[skill].modifier].weight
                    )}
                    ])
                  </i>
                </td>
                <td>
                  Value:{" "}
                  {skills[skill].points +
                    calculateAbilityModifier(
                      attributes[skills[skill].modifier].weight
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SkillCard;
