import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";
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

export const Parameters: React.SFC<IProps> = ({ person }) => {
  return (
    <Div>
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
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  display: flex;
`;
