import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";
import { Block } from "./Block";
import { Macronutrients } from "./Macronutrients";
import { Parameter } from "./Parameter";

interface IProps {
  person: Person;
}

@observer
export class NutritionParameters extends React.Component<IProps> {
  public render() {
    const { person } = this.props;
    if (!person.hasAllBodyParameters) {
      return null;
    }

    return (
      <HighBlock>
        <Section>
          <Title>Kалорий</Title>
          <Parameter person={person} field="calories" />
        </Section>
        <Section>
          <Title>Процент рациона</Title>
          <Parameter person={person} field="delta" />
        </Section>
        <Macronutrients person={person} />
      </HighBlock>
    );
  }
}

const HighBlock = Block.extend`
  height: 8rem;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 1.5rem;
  flex-direction: column;

  @media (max-width: 40rem) {
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);

    &:last-child {
      border-bottom: 0;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.9rem;
  flex-shrink: 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
`;
