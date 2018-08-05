import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";
import { Macronutrient } from "./Macronutrient";
import { MacronutrientSlider } from "./MacronutrientSlider";

interface IProps {
  person: Person;
}

@observer
export class Macronutrients extends React.Component<IProps> {
  public render() {
    const { person } = this.props;
    const order: [string, string, string] = ["proteins", "fats", "carbs"];

    return (
      <Div>
        <MacronutrientSlider person={person} order={order} />

        <Labels>
          {order.map(value => (
            <Macronutrient person={person} field={value} key={value} />
          ))}
        </Labels>
      </Div>
    );
  }
}

const Div = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-left: solid 1px rgba(0, 0, 0, 0.2);

  @media (max-width: 75rem) {
    width: 100%;
    height: 8rem;
    border-left: 0;
  }
`;

const Labels = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
