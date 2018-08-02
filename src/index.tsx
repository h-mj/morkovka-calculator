import * as React from "react";
import { render } from "react-dom";
import { Body } from "./components/Body";
import { BodyMassIndexScale } from "./components/BodyMassIndexScale";
import { BodyParameters } from "./components/BodyParameters";
import { NutritionParameters } from "./components/NutritionParameters";
import { RegularCalories } from "./components/RegularCalories";
import { Person } from "./models/Person";

const person = new Person();

render(
  <Body>
    <BodyParameters person={person} />
    <BodyMassIndexScale person={person} />
    <RegularCalories person={person} />
    <NutritionParameters person={person} />
  </Body>,
  document.getElementById("root")
);
