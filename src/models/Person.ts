import { computed, observable } from "mobx";

const activenessFactors = {
  extreme: 1.9,
  heavy: 1.725,
  mild: 1.375,
  moderate: 1.55,
  sedentary: 1.2
};

export class Person {
  @observable public gender = "female";
  @observable public age = "42";
  @observable public height = "168";
  @observable public weight = "58";
  @observable public activeness = "moderate";
  @observable public delta = "0";
  @observable public carbPercentage = 30;
  @observable public proteinPercentage = 40;
  @observable public fatPercentage = 30;

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

  @computed
  public get limits() {
    let regularCalories;

    const age = Number.parseFloat(this.age);
    const weight = Number.parseFloat(this.weight);
    const height = Number.parseFloat(this.height);
    const delta = Number.parseFloat(this.delta);

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
  public get hasAllBodyParameters() {
    return (
      !Number.isNaN(Number.parseFloat(this.age)) &&
      !Number.isNaN(Number.parseFloat(this.weight)) &&
      !Number.isNaN(Number.parseFloat(this.height))
    );
  }

  @computed
  public get regularCalories() {
    return Math.round(this.limits.regularCalories);
  }

  @computed
  public get calories() {
    return Math.round(this.limits.calories);
  }

  public set calories(calories) {
    // ignore
  }
}
