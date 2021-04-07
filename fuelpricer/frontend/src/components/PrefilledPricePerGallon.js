import React, { Component } from "react";
import styled, { css } from "styled-components";

function PrefilledPricePerGallon(props) {
  return (
    <Container {...props}>
      <PricePerGallon>Price Per Gallon</PricePerGallon>
      <TextInput value={props.value} name="pricepergallon" placeholder="Price/Gallon"></TextInput>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PricePerGallon = styled.span`
  font-family: Lato;
  font-size: 12px;
  text-align: left;
  color: rgba(74,74,74,1);
  opacity: 0.6;
  padding-top: 16px;
  `;
  
  const TextInput = styled.input`
  font-family: Lato;
  color: rgba(74,74,74,1);
  font-size: 18px;
  font-weight: 600;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding: 0px;
  width: 300px;
  height: 34px;
  border-radius: 10px;
  background-color: rgba(230, 230, 230,1);
  padding-left: 10px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  caret-color: transparent;
  &:focus {
    outline: none; !important
  }
`;

export default PrefilledPricePerGallon;
