import React, { Component } from "react";
import styled, { css } from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";

function TextAddress1(props) {
  return (    
    <Container {...props}>
      <FaMapMarkerAlt
        style={{
          color: "#616161",
          fontSize: 20,
          paddingLeft: 10,
          marginRight: 8
        }}
      />
      <InputStyle value={props.value} name="address" placeholder="Address Line 1*" maxLength={100}></InputStyle>
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

export default TextAddress1;
