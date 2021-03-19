import React, { Component } from "react";
import styled, { css } from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

function TextCity(props) {
  return (
    <Container {...props}>
      <FontAwesomeIcon
        name="building"
        style={{
          color: "#616161",
          fontSize: 20,
          padding: 0,
          paddingLeft: 8,
          marginRight: 5
        }}
      ></FontAwesomeIcon>
      <InputStyle placeholder="City" maxLength={100}></InputStyle>
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
`;

export default TextCity;
