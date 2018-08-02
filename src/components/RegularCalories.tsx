import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";

const activenessAdjectives = {
  extreme: "очень высокой",
  heavy: "высокой",
  mild: "малой",
  moderate: "средней",
  sedentary: "низкой"
};

interface IProps {
  person: Person;
}

@observer
export class RegularCalories extends React.Component<IProps> {
  public render() {
    const { person } = this.props;

    return (
      <Div>
        <Section>
          Дневная норма калорий при {activenessAdjectives[person.activeness]}{" "}
          активности
        </Section>
        <Section>{person.limits.calories.toFixed(0)}</Section>
      </Div>
    );
  }
}

const Div = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
`;

const Section = styled.div`
  width: 100%;
  padding: 0 1rem;
`;
