import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
 
body {
  font-family: sans-serif;
  font-size: 5;
  background:${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 10px;
}

a {
  color: #01BFFF 
}

a:hover {
    color: #11dd77;
}

a:visited {
    color: #red;
}


`;

export const PointerCursor = styled.p`
  cursor: pointer;
`;
