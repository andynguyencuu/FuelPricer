import React, { Component } from "react";
import styled, { css } from "styled-components";

function ButtonBig(props) {
  return (
    <Container {...props}>
      <Button>{props.button || "Button"}</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #007AFF;
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
  font-size: 25px;
  font-weight: 400;
`;

export default ButtonBig;
