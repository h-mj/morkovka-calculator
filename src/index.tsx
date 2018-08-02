import * as React from "react";
import { render } from "react-dom";
import { Body } from "./components/Body";
import { BodyMassIndexScale } from "./components/BodyMassIndexScale";
import { Parameters } from "./components/Parameters";
import { RegularCalories } from "./components/RegularCalories";
import { Separator } from "./components/Separator";
import { Person } from "./models/Person";

const person = new Person();

render(
  <Body>
    <Parameters person={person} />
    <Separator />
    <BodyMassIndexScale person={person} />
    <Separator />
    <RegularCalories person={person} />
  </Body>,
  document.getElementById("root")
);
