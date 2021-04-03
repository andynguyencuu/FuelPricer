import React, { Component } from "react";
import styled, { css } from "styled-components";
import { FaLocationArrow} from "react-icons/fa";

function TextZip(props) {
  return (
    <Container {...props}>

      <FaLocationArrow
        style={{
          color: "#616161",
          fontSize: 18,
          paddingLeft: 10,
          marginRight: 10
        }}
      />

      <InputStyle value={props.value} name="zipcode" placeholder="Zip Code*" inputMode="numeric" type="number" maxLength={9}></InputStyle>
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
