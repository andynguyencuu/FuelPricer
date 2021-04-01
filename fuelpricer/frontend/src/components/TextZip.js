import React, { Component } from "react";
import styled, { css } from "styled-components";

function TextZip(props) {
  return (
    <Container {...props}>
      <InputStyle value={props.value} name="zipcode" placeholder="Zip Code*" inputMode="numeric" maxLength={9}></InputStyle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(230,230,230,1);
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
`;

const InputStyle = styled.input`
  font-family: Lato;
  color: #000;
  margin-left: 16px;
  font-size: 18px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  padding: 0px;
  padding-left: 0px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  &:focus {
    outline: none; !important
  }
`;

export default TextZip;
