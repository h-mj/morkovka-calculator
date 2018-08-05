import * as React from "react";
import { Person } from "../models/Person";
import { Block } from "./Block";
import { Parameter } from "./Parameter";

const genderOptions: Array<[string, string]> = [
  ["Женщина", "female"],
  ["Мужчина", "male"]
];

const activenessOptions: Array<[string, string]> = [
  ["Низкая", "sedentary"],
  ["Малая", "mild"],
  ["Средняя", "moderate"],
  ["Высокая", "heavy"],
  ["Очень высокая", "extreme"]
];

interface IProps {
  person: Person;
}

export const BodyParameters: React.SFC<IProps> = ({ person }) => {
  return (
    <ExtendedBlock>
      <Parameter
        person={person}
        field="gender"
        title="Пол"
        options={genderOptions}
      />
      <Parameter person={person} field="age" title="Возраст" />
      <Parameter person={person} field="height" title="Рост" />
      <Parameter person={person} field="weight" title="Вес" />
      <Parameter
        person={person}
        field="activeness"
        title="Активность"
        options={activenessOptions}
      />
    </ExtendedBlock>
  );
};

const ExtendedBlock = Block.extend`
  font-size: 1.1rem;
`;
