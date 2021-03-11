import React, { Component } from "react";
import styled, { css } from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

function CalendarDeliveryDate(props) {
  return (
    <Container {...props}>
      <IconStyleRow>
        <FontAwesomeIcon
          name="calendar"
          style={{
            color: "#616161",
            fontSize: 20,
            height: 26,
            width: 32,
            marginTop: 6
          }}
        ></FontAwesomeIcon>
        <InputStyle placeholder="Delivery Date"></InputStyle>
      </IconStyleRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(230, 230, 230,1);
  border-radius: 10px;
  flex-direction: row;
`;

const InputStyle = styled.input`
  font-family: Lato;
  color: #000;
  font-size: 18px;
  flex: 1 1 0%;
  line-height: 16px;
  height: 35px;
  width: 262px;
  background-color: rgba(230, 230, 230,1);
  border-radius: 10px;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

const IconStyleRow = styled.div`
  height: 35px;
  flex-direction: row;
  display: flex;
  flex: 1 1 0%;
  margin-left: 6px;
`;

export default CalendarDeliveryDate;
