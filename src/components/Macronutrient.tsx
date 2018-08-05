import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";

const fieldTexts = {
  carbs: "Углеводы",
  fats: "Жиры",
  proteins: "Белки"
};

interface IMacronutrientProps {
  person: Person;
  field: string;
}

const round = (n: number, e = 0) => {
  return Math.round(Math.pow(10, e) * n) / Math.pow(10, e);
};

@observer
export class Macronutrient extends React.Component<IMacronutrientProps> {
  public render() {
    const { person, field } = this.props;
    const grams = person.limits[field];
    const gramsPerKg = grams / Number.parseFloat(person.weight);

    if (isNaN(grams)) {
      return null;
    }

    return (
      <Section>
        <Secondary>{fieldTexts[field]}</Secondary>
        <Primary>{person[field]}%</Primary>
        <Secondary>
          {round(grams)}г
          {isFinite(gramsPerKg) && `, ${round(gramsPerKg, 2)}г/кг`}
        </Secondary>
      </Section>
    );
  }
}

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Primary = styled.div`
  text-align: center;
  font-size: 1.5rem;
  padding: 0.1rem 0;
`;

const Secondary = styled.div`
  text-align: center;
  font-size: 0.9rem;
`;
