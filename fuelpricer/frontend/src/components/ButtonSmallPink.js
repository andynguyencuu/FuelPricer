import React, { Component } from "react";
import styled, { css } from "styled-components";

function ButtonSmallPink(props) {
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
  border: 4px solid rgba(219,87,147,1);
  background-color: ${props => props.hover ? 'rgba(255,255,255,1)' : 'rgba(219,87,147,1)'};
  color: ${props => props.hover ? 'rgba(219,87,147,1)' : 'rgba(255,255,255,1)'};
  transition: background-color 0.1s ease-out, color 0.1s ease-out;
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

export default ButtonSmallPink;
