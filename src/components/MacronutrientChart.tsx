import { observer } from "mobx-react";
import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { Person } from "../models/Person";
import { Block } from "./Block";

import "chart.piecelabel.js";

interface IProps {
  person: Person;
}

@observer
export class MacronutrientChart extends React.Component<IProps> {
  public render() {
    const { person } = this.props;

    const data: Chart.ChartData = {
      datasets: [
        {
          backgroundColor: ["#eeaa00", "#33aa66", "#ee0000"],
          data: [
            Math.round(person.limits.proteins),
            Math.round(person.limits.fats),
            Math.round(person.limits.carbs)
          ]
        }
      ],
      labels: ["Белки", "Жиры", "Углеводы"]
    };

    const options: any = {
      pieceLabel: {
        fontColor: "#ffffff",
        fontFamily: "'Roboto', sans-serif",
        fontSize: 16,
        render: (args: any) => {
          return `${args.value}г`;
        },
        textShadow: true
      }
    };

    return (
      <ExtendedBlock>
        <Wrapper>
          <Doughnut data={data} options={options} />
        </Wrapper>
      </ExtendedBlock>
    );
  }
}

const ExtendedBlock = Block.extend`
  height: inherit;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 2rem auto;
`;
