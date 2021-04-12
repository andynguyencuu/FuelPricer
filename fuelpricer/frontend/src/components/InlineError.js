import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";

function InlineError(props) {
  return (
      <ErrorMsg {...props}>
      </ErrorMsg>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; } 
`;

const fadeOut = keyframes`
  from { opacity: 1; }

  to { opacity: 0; }
`;
const ErrorMsg = styled.text`
  font-family: Lato;
  color: #FD625F;
  font-size: 16px;
  text-align: center;
  justify-content: center;
  flex: 1 1 0%;
  line-height: 0px;
  font-weight: 800;
  height: 10px;
  padding: 5px;
  border: none;
  background: transparent;
  display: flex;

  visibility: ${props => props.error  ? 'visible' : 'hidden'};
  animation: ${props => props.error ? fadeIn : fadeOut} 1s ease-out;
  transition: visibility 1s ease-out;
`;



export default InlineError;
