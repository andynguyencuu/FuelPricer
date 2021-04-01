import React, { Component } from "react";
import styled, { css } from "styled-components";

function TextGallonsRequested(props) {
  return (
    <Container {...props}>
  
      <InputStyle value={props.value} name="gallonsrequested" type = "number" placeholder="Gallons Requested" maxLength={50}></InputStyle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(230, 230, 230,1);
`;

const InputStyle = styled.input`
  font-family: Lato;
  color: #000;
  margin-left: 16px;
  font-size: 18px;
  align-self: stretch;
  line-height: 16px;
  width: 263px;
  padding: 0px;
  border: none;
  background: transparent;
  &:focus {
    outline: none; !important
  }
`;

export default TextGallonsRequested;
