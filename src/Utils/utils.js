import { ATTRIBUTE_LIST, SKILL_LIST } from "../consts.js";

export function getDefaultAttributes() {
  const obj = {};
  ATTRIBUTE_LIST.forEach((attribute) => {
    obj[attribute] = { name: attribute, weight: 10 };
  });

  return obj;
}

export function getDefaultSkills() {
  const obj = {};
  SKILL_LIST.forEach((skill) => {
    obj[skill.name] = {
      name: skill.name,
      modifier: skill.attributeModifier,
      points: 0,
    };
  });

  return obj;
}

export function getNewCharacter() {
  return {
    attributes: getDefaultAttributes(),
    skills: getDefaultSkills(),
  };
}

export function getTotalWeight(attributes) {
  let sum = 0;
  for (let attribute in attributes) sum += attributes[attribute].weight;
  return sum;
}

export function getTotalSkillPoints(skills) {
  let sum = 0;
  for (let skill in skills) sum += skills[skill].points;
  return sum;
}

export function calculateAbilityModifier(weight) {
  return Math.floor(weight / 2) - 5;
}

export function calculateMaxPoints(weight) {
  return Math.max(calculateAbilityModifier(weight) * 4 + 10, 0);
}
