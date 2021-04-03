import React, { Component } from "react";
import styled, { css } from "styled-components";
import { FaTint} from "react-icons/fa";

function TextGallonsRequested(props) {
  return (
    <Container {...props}>

      <FaTint
        style={{
          color: "#616161",
          fontSize: 20,
          paddingLeft: 10,
          marginRight: 8
        }}
      />

      <InputStyle name="gallonsRequested" type="number" inputMode="numeric" placeholder="Gallons Requested" maxLength={50}></InputStyle>
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
  font-size: 18px;
  font-weight: bold;
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
