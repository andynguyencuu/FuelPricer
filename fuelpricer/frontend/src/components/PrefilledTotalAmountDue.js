import React, { Component } from "react";
import styled, { css } from "styled-components";

function PrefilledTotalAmountDue(props) {
  return (
    <Container {...props}>
      <TotalAmountDue>Total Amount Due</TotalAmountDue>
      <InputStyle value={props.value} name="totalamountdue" placeholder="Not Yet Generated" editable={false}></InputStyle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom-width: 1px;
  border-color: #D9D5DC;
  flex-direction: column;
`;

const TotalAmountDue = styled.span`
  font-family: Lato;
  font-size: 12px;
  text-align: left;
  color: #000;
  opacity: 0.6;
  padding-top: 16px;
`;

const InputStyle = styled.input`
  font-family: Lato;
  color: #1B4323;
  font-size: 18px;
  font-weight: 900;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding-bottom: 8px;
  background-color: rgba(230, 230, 230,1);
  border-radius: 10px;
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

export default PrefilledTotalAmountDue;
