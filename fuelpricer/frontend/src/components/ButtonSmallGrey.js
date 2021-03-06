import React, { Component } from "react";
import styled, { css } from "styled-components";

function ButtonSmallGrey(props) {
  return (
    <Container {...props}>
      <Caption>{props.caption || "Button"}</Caption>
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
  border: 4px solid #8E8E93;
  background-color: ${props => props.hover ? 'rgba(255,255,255,1)' : '#8E8E93'};
  color: ${props => props.hover ? '#8E8E93' : 'rgba(255,255,255,1)'};
  transition: background-color 0.15s ease-out, color 0.15s ease-out;
`;

const Caption = styled.span`
  font-family: Lato;
  font-size: 18px;
  font-weight: 700;
  margin: ;
  padding: 0px;
  padding-right: 6px;
  padding-left: 6px;
  flex: 1 1 0%;
  align-self: center;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

export default ButtonSmallGrey;
