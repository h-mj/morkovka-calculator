import styled from "styled-components";

export const Body = styled.main`
  width: 75rem;
  margin: 4rem auto;
  background-color: #ffffff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);

  @media (max-width: 75rem) {
    width: 100%;
    margin: 0;
    box-shadow: initial;
  }
`;
