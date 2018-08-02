import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";

const bodyMassIndexRanges = [
  { lt: 16, name: "Выраженный дефицит массы тела" },
  { lt: 18.5, name: "Недостаточная (дефицит) масса тела" },
  { lt: 25, name: "Норма" },
  { lt: 30, name: "Избыточная масса тела (предожирение)" },
  { lt: 35, name: "Ожирение" },
  { lt: 40, name: "Ожирение резкое" },
  { lt: Infinity, name: "Очень резкое ожирение" }
];

interface IProps {
  person: Person;
}

@observer
export class BodyMassIndexScale extends React.Component<IProps> {
  public render() {
    const { person } = this.props;
    const { height, weight } = person;
    const heightSquared = (height * height) / 10000;
    const bodyMassIndex = weight / heightSquared;
    const rangeIndex = bodyMassIndexRanges.findIndex(
      ({ lt }) => bodyMassIndex < lt
    );
    const lowerRange = bodyMassIndexRanges[rangeIndex - 1];
    const range = bodyMassIndexRanges[rangeIndex];
    const higherRange = bodyMassIndexRanges[rangeIndex + 1];

    return (
      <Div>
        {typeof lowerRange !== "undefined" && (
          <>
            <SideSection>{lowerRange.name}</SideSection>
            <Post value={lowerRange.lt * heightSquared} />
          </>
        )}
        <Section>{range.name}</Section>
        {typeof higherRange !== "undefined" && (
          <>
            <Post value={range.lt * heightSquared} />
            <SideSection>{higherRange.name}</SideSection>
          </>
        )}
      </Div>
    );
  }
}

const Div = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 2rem;
  font-size: 1.1rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const SideSection = Section.extend`
  width: 30%;
  flex-shrink: 0;
  font-size: 0.9rem;
`;

interface IPostProps {
  value: number;
}

const Post: React.SFC<IPostProps> = ({ value }) => {
  return (
    <ZeroWidth>
      <PostBody />
      <PostTitle>{value.toFixed(1)}</PostTitle>
      <PostBody />
    </ZeroWidth>
  );
};

const ZeroWidth = styled.div`
  width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PostTitle = styled.div`
  font-size: 0.9rem;
  padding: 0.2rem 0.3rem;
  border: solid 1px rgba(0, 0, 0, 0.2);
`;

const PostBody = styled.div`
  width: 1px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;
