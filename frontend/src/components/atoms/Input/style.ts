import styled from "styled-components";
import { IInputProps } from "./Input";

export const StyledInput = styled.input<IInputProps>`
  padding: 10px;
  box-shadow: none;
  outline: none;
  font-size: 14px;
  min-width: 250px;
  max-width: 500px;
`;
