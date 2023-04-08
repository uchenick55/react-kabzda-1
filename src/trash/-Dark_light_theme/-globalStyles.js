import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
/*
 body {
  font-family: sans-serif;
  font-size: 5;
  background:${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0px;
}
a {
    color: ${({ theme }) => theme.a_color};
}
a:visited {
    color: ${({ theme }) => theme.a_visited};
}
*/



`;
export const PointerCursor = styled.span`
  cursor: pointer;
`;
