import { useState } from "react";
import { CLASS_LIST } from "../consts.js";

const classKeys = Object.keys(CLASS_LIST);

function ClassCard({ attributes }) {
  const [showClassInfo, setShowClassInfo] = useState(
    new Array(classKeys.length).fill(false)
  );

  let inactiveClasses = new Set();

  for (let attribute in attributes)
    for (let className in CLASS_LIST)
      if (
        attributes[attribute].weight <
        CLASS_LIST[className][attributes[attribute].name]
      )
        inactiveClasses.add(className);

  function handleClassInfo(index) {
    showClassInfo[index] = !showClassInfo[index];
    setShowClassInfo([...showClassInfo]);
  }

  return (
    <div>
      <h2>Class</h2>

      <table>
        <tbody>
          {classKeys.map((className, index) => {
            return (
              <>
                <tr key={index} onClick={() => handleClassInfo(index)}>
                  <td>{className}</td>
                  <td>
                    {inactiveClasses.has(className)
                      ? "(Deactivated)"
                      : "(Activated)"}
                  </td>
                </tr>

                <tr key={index + "-info"}>
                  <td>
                    {showClassInfo[index] &&
                      Object.entries(CLASS_LIST[className]).map(
                        ([key, value]) => {
                          return key + " : " + value + " ";
                        }
                      )}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClassCard;
