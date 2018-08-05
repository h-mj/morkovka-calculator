import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Person } from "../models/Person";
import { Block } from "./Block";

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

    if (!person.hasAllBodyParameters) {
      return null;
    }

    const rangeIndex = bodyMassIndexRanges.findIndex(
      ({ lt }) => person.bodyMassIndex < lt
    );

    const lowerRange = bodyMassIndexRanges[rangeIndex - 1];
    const range = bodyMassIndexRanges[rangeIndex];
    const higherRange = bodyMassIndexRanges[rangeIndex + 1];

    if (typeof range === "undefined") {
      return false;
    }

    return (
      <ExtendedBlock>
        {typeof lowerRange !== "undefined" && (
          <>
            <SideSection>{lowerRange.name}</SideSection>
            <Post value={person.getCorrespondingWeight(lowerRange.lt)} />
          </>
        )}
        <Section>{range.name}</Section>
        {typeof higherRange !== "undefined" && (
          <>
            <Post value={person.getCorrespondingWeight(range.lt)} />
            <SideSection>{higherRange.name}</SideSection>
          </>
        )}
      </ExtendedBlock>
    );
  }
}

const ExtendedBlock = Block.extend`
  @media (max-width: 40rem) {
    height: 4rem;
    flex-direction: row;
  }
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
  background-color: #ffffff;
  border: solid 1px rgba(0, 0, 0, 0.2);
`;

const PostBody = styled.div`
  width: 1px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;
