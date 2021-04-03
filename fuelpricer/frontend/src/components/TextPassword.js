import React, { Component } from "react";
import styled, { css } from "styled-components";
import { FaLock} from "react-icons/fa";

function TextPassword(props) {
  return (
    <Container {...props}>

      <FaLock
        style={{
          color: "#616161",
          fontSize: 20,
          paddingLeft: 10,
          marginRight: 8
        }}
      />

      <InputStyle
        name = "password"
        type="password"
        secureTextEntry={true}
        placeholder="Password"
        selectTextOnFocus={true}
      ></InputStyle>
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
  border-radius: 10px;
  font-weight: 400;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  &:focus {
    outline: none; !important
  }
`;

export default TextPassword;
