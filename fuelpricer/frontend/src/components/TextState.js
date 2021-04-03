import React, { Component } from "react";
import styled, { css } from "styled-components";
import { FaMapSigns} from "react-icons/fa";

function TextState(props) {
  return (
    <Container {...props}>

      <FaMapSigns
        style={{
          color: "#616161",
          fontSize: 20,
          paddingLeft: 10,
          marginRight: 8
        }}
      />

      <InputStyle value={props.value} name="state" placeholder="State*" maxLength={2}></InputStyle>
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
  font-size: 18px;
  align-self: stretch;
  flex: 1 1 0%;
  line-height: 16px;
  font-weight: 400;
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

export default TextState;
