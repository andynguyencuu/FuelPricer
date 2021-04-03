import React, { Component } from "react";
import styled, { css } from "styled-components";
import { FaCity} from "react-icons/fa";

function TextCity(props) {
  return (
    <Container {...props}>

      <FaCity
        style={{
          color: "#616161",
          fontSize: 20,
          paddingLeft: 10,
          marginRight: 8
        }}
      />

      <InputStyle value={props.value} name="city" placeholder="City*" maxLength={100}></InputStyle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgba(230, 230, 230,1);
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

export default TextCity;
