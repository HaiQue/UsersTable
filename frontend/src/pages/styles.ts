import styled, { keyframes } from "styled-components";
import { IPageProps } from "./types";
import { colorThemes } from "../shared/color_themes";

interface StyledSectionHeadingWrapperProps {
  theme: {
    background: string;
  };
}

interface StyledSectionContentProps {
  theme: {
    background: string;
  };
}

const purpleColor = colorThemes.purple.background;
const blueColor = colorThemes.blue.background;
const blueHoverColor = colorThemes.blue.hovercolor;

export const StyledMain = styled.main<IPageProps>`
  padding: 35px 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: stretch;

  ${(props) => {
    const breakpoint = props.layoutbreakpoint || "1200px";
    return `
      @media (min-width: ${breakpoint}) {
        min-height: 80vh;
        padding: 50px;
      }
    `;
  }}
`;

export const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 0 15px 20px 3px lightgray;
`;

export const StyledSectionHeadingWrapper = styled.div<StyledSectionHeadingWrapperProps>`
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.background};
  color: white;
  padding: 20px;
  border-radius: 10px 10px 0 0;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

export const StyledSectionContent = styled.div<StyledSectionContentProps>`
  padding: 20px 40px;
  height: 100%;
  border-radius: 0 0 5px 5px;
  min-height: 60vh;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th,
  td {
    padding: 0.75rem;
    border-bottom: 1px solid #ddd;

    &:last-child {
      text-align: center;
      display: flex;
      justify-content: flex-end;
      border: none;
    }
  }

  @media (max-width: 1200px) {
    tr {
      display: block;
      margin-bottom: 0.625em;
    }

    td {
      display: block;
      text-align: right;

      &:before {
        content: attr(data-label);
        float: left;
        text-transform: uppercase;
        font-weight: 600;
      }

      &:last-child {
        border-bottom: 1px solid #ddd;
      }
    }
  }
`;

export const StyledButton = styled.button`
  color: black;
  background-color: #485fc7;
  margin: auto 0 auto auto;
  display: inline-block;
`;

export const StyledGridButton = styled.button`
  color: black;
  background-color: #485fc7;
  display: inline-block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  width: 30%;
  margin-right: 2rem;
  margin-left: 16rem;
`;

interface StyledLabelInputPairProps {
  gridArea: string;
}

export const StyledLabelInputPair = styled.div<StyledLabelInputPairProps>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-area: ${(props) => props.gridArea};
`;

export const StyledForm = styled.form`
  margin-top: 2rem;
  margin-right: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "name surname"
    "email age"
    "buttons buttons";
  gap: 1em;
  align-items: center;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, auto);
    grid-template-areas:
      "name"
      "surname"
      "email"
      "age"
      "buttons";
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledAddNewButton = styled.button`
  color: black;
  background-color: #485fc7;
  margin: 0.75rem;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  grid-area: buttons;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 6px solid ${purpleColor};
    border-color: ${purpleColor} transparent ${purpleColor} transparent;
    animation: ${spinAnimation} 1.2s linear infinite;
  }
`;

export const ErrorBox = styled.div`
  padding: 20px;
  color: red;
  background-color: #ffeeee;
  border: 1px solid red;
  border-radius: 4px;
`;

export const StyledModal = styled.div`
  width: 50%;
  height: 50%;
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

export const StyledInput = styled.input`
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  color: #333;
  background-color: #f3f3f3;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 5px #485fc7;
    border: 1px solid #485fc7;
  }
`;
