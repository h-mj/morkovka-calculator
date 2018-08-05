import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";
import { Block } from "./Block";

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

    if (!person.hasAllBodyParameters) {
      return null;
    }

    return (
      <Div>
        <Section>
          {`Дневная норма калорий при ${
            activenessAdjectives[person.activeness]
          } активности`}
        </Section>
        <Section>{person.regularCalories}</Section>
      </Div>
    );
  }
}

const Div = Block.extend`
  align-items: center;
`;

const Section = styled.div`
  width: 100%;
  padding: 0 1rem;
  font-size: 1.1rem;
  display: flex;
  text-align: center;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;

  @media only screen and (max-width: 40rem) {
    &:first-child {
      height: 2rem;
      font-size: 0.9rem;
      border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    }

    &:last-child {
      height: 4rem;
      font-size: 1.5rem;
    }
  }
`;
