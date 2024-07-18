import { calculateAbilityModifier } from "../Utils/utils.js";

function AttributesCard({ attributes, onChangeAttribute }) {
  return (
    <div>
      <h2>Attributes</h2>

      <table>
        <tbody>
          {Object.keys(attributes).map((attribute) => {
            return (
              <tr key={attribute} style={{ marginBottom: 15 }}>
                <td>{attributes[attribute].name}</td>
                <td>
                  <button onClick={() => onChangeAttribute(attribute, false)}>
                    -
                  </button>{" "}
                  {attributes[attribute].weight}{" "}
                  <button onClick={() => onChangeAttribute(attribute, true)}>
                    +
                  </button>
                </td>
                <td>
                  (Ability Modifier:{" "}
                  {calculateAbilityModifier(attributes[attribute].weight)})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AttributesCard;
