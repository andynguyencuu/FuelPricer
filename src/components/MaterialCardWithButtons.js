import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function MaterialCardWithButtons(props) {
  return (
    <Container {...props}>
      <CardItemImagePlace
        src={require("../assets/images/cardImage1.png")}
      ></CardItemImagePlace>
      <ButtonGroup>
        <LeftBtn>
          <ButtonOverlay>
            <MaterialCommunityIconsIcon
              name="heart"
              style={{
                fontSize: 24,
                color: "#000",
                opacity: 0.5
              }}
            ></MaterialCommunityIconsIcon>
          </ButtonOverlay>
        </LeftBtn>
        <CenterBtn>
          <ButtonOverlay>
            <MaterialCommunityIconsIcon
              name="book"
              style={{
                fontSize: 24,
                color: "#000",
                opacity: 0.5
              }}
            ></MaterialCommunityIconsIcon>
          </ButtonOverlay>
        </CenterBtn>
        <RightBtn>
          <ButtonOverlay>
            <MaterialCommunityIconsIcon
              name="share"
              style={{
                fontSize: 24,
                color: "#000",
                opacity: 0.5
              }}
            ></MaterialCommunityIconsIcon>
          </ButtonOverlay>
        </RightBtn>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-radius: 2px;
  border-color: #CCC;
  flex-wrap: nowrap;
  background-color: #FFF;
  overflow: hidden;
  flex-direction: column;
  border-style: solid;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

const ButtonOverlay = styled.button`
 display: block;
 background: none;
 height: 100%;
 width: 100%;
 border:none
 `;
const CardItemImagePlace = styled.img`
  background-color: #ccc;
  flex: 1 1 0%;
  min-height: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  padding: 8px;
  flex-direction: row;
  justify-content: space-around;
  display: flex;
`;

const LeftBtn = styled.div`
  padding: 8px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const CenterBtn = styled.div`
  padding: 8px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const RightBtn = styled.div`
  padding: 8px;
  flex-direction: column;
  display: flex;
  border: none;
`;

export default MaterialCardWithButtons;
