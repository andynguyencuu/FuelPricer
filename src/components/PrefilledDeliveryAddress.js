import React, { Component } from "react";
import styled, { css } from "styled-components";

function PrefilledDeliveryAddress(props) {
  return (
    <Container {...props}>
      <Label>Delivery Address (Your address)</Label>
      <InputStyle placeholder="Your Address" editable={false}></InputStyle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-family: Lato;
  font-size: 12px;
  text-align: left;
  color: rgba(74,74,74,1);
  opacity: 0.6;
  padding-top: 16px;
  height: 69px;
`;

const InputStyle = styled.input`
  font-family: Lato;
  color: #000;
  font-size: 18px;
  align-self: stretch;
  line-height: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 300px;
  background-color: rgba(230, 230, 230,1);
  border-radius: 10px;
  height: 35px;
  padding-left: 10px;
  border: none;
  background: transparent;
`;

export default PrefilledDeliveryAddress;
