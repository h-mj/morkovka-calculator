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
  @observable public age = 42;
  @observable public height = 168;
  @observable public weight = 58;
  @observable public activeness = "moderate";
  @observable public delta = 0;
  @observable public carbPercentage = 30;
  @observable public proteinPercentage = 40;
  @observable public fatPercentage = 30;

  @computed
  public get limits() {
    let regularCalories;

    if (this.gender === "female") {
      regularCalories =
        447.593 + 9.247 * this.weight + 3.098 * this.height - 4.33 * this.age;
    } else {
      regularCalories =
        88.362 + 13.397 * this.weight + 4.799 * this.height - 5.677 * this.age;
    }

    regularCalories *= activenessFactors[this.activeness];

    const calories = regularCalories * ((100 + this.delta) / 100);
    const carbs = ((this.carbPercentage / 100) * calories) / 4;
    const proteins = ((this.proteinPercentage / 100) * calories) / 4;
    const fats = ((this.fatPercentage / 100) * calories) / 9;

    return { regularCalories, calories, carbs, proteins, fats };
  }

  @computed
  public get hasAllBodyParameters() {
    return (
      !Number.isNaN(this.age) &&
      !Number.isNaN(this.weight) &&
      !Number.isNaN(this.height)
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
