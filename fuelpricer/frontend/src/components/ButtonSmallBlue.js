import React, { Component } from "react";
import styled, { css } from "styled-components";

function ButtonSmallBlue(props) {
  return (
    <Container {...props}>
      <Button>{props.button || "Button"}</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(48,116,209,1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 100px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Button = styled.span`
  font-family: Lato;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

export default ButtonSmallBlue;
