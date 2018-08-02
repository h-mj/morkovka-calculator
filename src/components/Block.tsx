import styled from "styled-components";

export const Block = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);

  &:last-child {
    border-bottom: 0;
  }
`;
