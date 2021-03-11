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
  background-color: #5856D6;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Button = styled.span`
  font-family: Calistoga;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
`;

export default ButtonFancy;
