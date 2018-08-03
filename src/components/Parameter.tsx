import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";
import { Input } from "./Input";
import { Select } from "./Select";

interface IProps {
  title: string;
  field: string;
  person: Person;
  options?: Array<[string, string]>;
}

@observer
export class Parameter extends React.Component<IProps> {
  public render() {
    const { title, field, person, options } = this.props;

    return (
      <Div>
        <Title>{title}</Title>
        {typeof options === "undefined" ? (
          <Input
            value={person[field]}
            onChange={this.handleChange}
            type="number"
          />
        ) : (
          <Select value={person[field]} onChange={this.handleChange}>
            {options.map(([optionTitle, optionValue]) => (
              <option value={optionValue} key={optionValue}>
                {optionTitle}
              </option>
            ))}
          </Select>
        )}
      </Div>
    );
  }

  private handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { person, field } = this.props;
    person[field] = event.target.value;
  };
}

const Div = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  text-align: center;
  font-size: 0.9rem;
`;