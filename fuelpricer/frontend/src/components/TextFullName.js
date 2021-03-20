import React, { Component } from "react";
import styled, { css } from "styled-components";

function TextFullName(props) {
  return (
    <Container {...props}>
      <InputStyle
        name="fullname"
        placeholder="Full Name"
        maxLength={50}
        autoFocus={true}
      ></InputStyle>
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
  flex: 1 1 0%;
  line-height: 16px;
  font-weight: 400;
  padding: 0px;
  padding-left: 0px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

export default TextFullName;
