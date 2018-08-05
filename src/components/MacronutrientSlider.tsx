import { observer } from "mobx-react";
import * as React from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";
import { Person } from "../models/Person";

interface IProps {
  person: Person;
  order: [string, string, string];
}

@observer
export class MacronutrientSlider extends React.Component<IProps> {
  public render() {
    const { person, order } = this.props;
    const [first, second] = order;

    return (
      <Div>
        <ReactSlider
          value={[person[first], person[first] + person[second]]}
          onChange={this.handleChange}
        >
          <Handle />
          <Handle />
        </ReactSlider>
      </Div>
    );
  }

  private handleChange = (values: [number, number]) => {
    const { person, order } = this.props;
    const [first, second, third] = order;

    person[first] = values[0];
    person[second] = values[1] - values[0];
    person[third] = 100 - values[1];
  };
}

const Div = styled.div`
  width: 100%;
  height: 2rem;
  flex-shrink: 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
`;

const Handle = styled.div`
  width: 0.5rem;
  height: 2rem;
  cursor: ew-resize;
  background-color: white;
  border-left: solid 1px rgba(0, 0, 0, 0.2);
  border-right: solid 1px rgba(0, 0, 0, 0.2);
`;
