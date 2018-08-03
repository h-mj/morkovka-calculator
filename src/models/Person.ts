import { computed, observable } from "mobx";

const activenessFactors = {
  extreme: 1.9,
  heavy: 1.725,
  mild: 1.375,
  moderate: 1.55,
  sedentary: 1.2
};

export class Person {
  @observable public carbPercentage = 30;
  @observable public proteinPercentage = 40;
  @observable public fatPercentage = 30;

  @observable
  private internal = {
    activeness: "moderate",
    age: "42",
    calories: "2050",
    delta: "0",
    gender: "female",
    height: "168",
    weight: "58"
  };

  @computed
  public get gender() {
    return this.internal.gender;
  }

  public set gender(gender) {
    this.internal.gender = gender;
    this.updateCalories();
  }

  @computed
  public get age() {
    return this.internal.age;
  }

  public set age(age) {
    this.internal.age = age;
    this.updateCalories();
  }

  @computed
  public get height() {
    return this.internal.height;
  }

  public set height(height) {
    this.internal.height = height;
    this.updateCalories();
  }

  @computed
  public get weight() {
    return this.internal.weight;
  }

  public set weight(weight) {
    this.internal.weight = weight;
    this.updateCalories();
  }

  @computed
  public get activeness() {
    return this.internal.activeness;
  }

  public set activeness(activeness) {
    this.internal.activeness = activeness;
    this.updateCalories();
  }

  @computed
  public get calories() {
    return this.internal.calories;
  }

  public set calories(calories) {
    const parsed = Number.parseFloat(calories);

    if (Number.isFinite(parsed)) {
      this.internal.calories = parsed.toString();
      this.internal.delta = Math.round(
        (parsed / this.limits.regularCalories) * 100 - 100
      ).toString();
    } else {
      this.internal.calories = calories;
      this.internal.delta = "";
    }
  }

  @computed
  public get delta() {
    return this.internal.delta;
  }

  public set delta(delta) {
    const parsed = Number.parseFloat(delta);

    if (Number.isFinite(parsed)) {
      this.internal.delta = parsed.toString();
      this.updateCalories();
    } else {
      this.internal.delta = delta;
      this.internal.calories = "";
    }
  }

  @computed
  public get hasAllBodyParameters() {
    return (
      Number.isFinite(Number.parseFloat(this.age)) &&
      Number.isFinite(Number.parseFloat(this.weight)) &&
      Number.isFinite(Number.parseFloat(this.height))
    );
  }

  @computed
  public get limits() {
    const age = Number.parseFloat(this.age);
    const weight = Number.parseFloat(this.weight);
    const height = Number.parseFloat(this.height);
    const delta = Number.parseFloat(this.delta);

    let regularCalories;

    if (this.gender === "female") {
      regularCalories = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    } else {
      regularCalories = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    }

    regularCalories *= activenessFactors[this.activeness];

    const calories = regularCalories * ((100 + delta) / 100);
    const carbs = ((this.carbPercentage / 100) * calories) / 4;
    const proteins = ((this.proteinPercentage / 100) * calories) / 4;
    const fats = ((this.fatPercentage / 100) * calories) / 9;

    return { regularCalories, calories, carbs, proteins, fats };
  }

  @computed
  public get regularCalories() {
    return Math.round(this.limits.regularCalories).toString();
  }

  @computed
  public get bodyMassIndex() {
    const weight = Number.parseFloat(this.weight);
    const height = Number.parseFloat(this.height);
    const heightSquared = (height / 100) * (height / 100);

    return weight / heightSquared;
  }

  public getCorrespondingWeight(bodyMassIndex: number) {
    const height = Number.parseFloat(this.height);
    const heightSquared = (height / 100) * (height / 100);

    return bodyMassIndex * heightSquared;
  }

  private updateCalories() {
    this.internal.calories = Math.round(this.limits.calories).toString();
  }
}
