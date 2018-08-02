import { observer } from "mobx-react";
import * as React from "react";
import { Person } from "../models/Person";
import { Block } from "./Block";
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
      <Block>
        <Parameter person={person} field="calories" title="Kалорий" />
        <Parameter person={person} field="delta" title="Процент рациона" />
      </Block>
    );
  }
}
