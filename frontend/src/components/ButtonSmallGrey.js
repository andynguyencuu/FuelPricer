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
  background-color: #8E8E93;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Caption = styled.span`
  font-family: Lato;
  color: #fff;
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
