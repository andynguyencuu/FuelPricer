import React, { Component } from "react";
import styled, { css } from "styled-components";

function ButtonFancy(props) {
  return (
    <Container {...props}>
      <Button>{props.button || "Button"}</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  padding-left: 16px;
  padding-right: 16px;
  border: 4px solid #5856D6;
  background-color: ${props => props.hover ? 'rgba(255,255,255,1)' : '#5856D6'};
  color: ${props => props.hover ? '#5856D6' : 'rgba(255,255,255,1)'};
  transition: background-color 0.1s ease-out, color 0.1s ease-out;

`;

const Button = styled.span`
  font-family: Calistoga;
  font-size: 18px;
  font-weight: 400;
`;

export default ButtonFancy;
