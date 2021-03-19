import React, { Component } from "react";
import styled, { css } from "styled-components";
import MaterialCommunityIconsIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";

function MaterialCard12(props) {
  return (
    <Container {...props}>
      <SubtitleHereStack>
        <SubtitleHere>2/25/2021 (generated date)</SubtitleHere>
        <TitleStyleStack>
          <TitleStyle>$42,069.69</TitleStyle>
          <CardItemImagePlace
            src={require("../assets/images/cardImage3.png")}
          ></CardItemImagePlace>
        </TitleStyleStack>
      </SubtitleHereStack>
      <ActionBodyRow>
        <ActionBody>
          <ActionButton1>
            <ButtonOverlay>
              <ActionText1>ACTION 1</ActionText1>
            </ButtonOverlay>
          </ActionButton1>
          <ActionButton2>
            <ButtonOverlay>
              <XButton>X button?</XButton>
            </ButtonOverlay>
          </ActionButton2>
        </ActionBody>
        <LeftBtn1>
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
        </LeftBtn1>
        <CenterBtn1>
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
        </CenterBtn1>
        <RightBtn1>
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
        </RightBtn1>
      </ActionBodyRow>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-radius: 2px;
  border-color: #CCC;
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
const SubtitleHere = styled.span`
  font-family: Roboto;
  font-size: 13px;
  color: #000;
  line-height: 16px;
  opacity: 0.5;
  position: absolute;
  top: 0px;
  left: 2px;
  height: 16px;
  width: 161px;
`;

const TitleStyle = styled.span`
  font-family: Lato;
  font-size: 40px;
  color: rgba(28,80,28,1);
  font-weight: 900;
  left: 0px;
  width: 232px;
  top: 12px;
  height: 48px;
  position: absolute;
`;

const CardItemImagePlace = styled.img`
  background-color: #ccc;
  height: 120px;
  width: 120px;
  position: absolute;
  top: 0px;
  left: 227px;
`;

const TitleStyleStack = styled.div`
  top: 4px;
  left: 0px;
  width: 347px;
  height: 120px;
  position: absolute;
`;

const SubtitleHereStack = styled.div`
  width: 347px;
  height: 124px;
  margin-top: 10px;
  margin-left: 6px;
  position: relative;
`;

const ActionBody = styled.div`
  flex-direction: row;
  height: 52px;
  width: 170px;
  display: flex;
`;

const ActionButton1 = styled.div`
  padding: 8px;
  height: 36px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const ActionText1 = styled.span`
  font-family: Arial;
  font-size: 14px;
  color: #000;
  opacity: 0.9;
`;

const ActionButton2 = styled.div`
  padding: 8px;
  height: 36px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const XButton = styled.span`
  font-family: Arial;
  font-size: 14px;
  color: #000;
  opacity: 0.9;
`;

const LeftBtn1 = styled.div`
  height: 42px;
  width: 40px;
  flex-direction: column;
  display: flex;
  margin-left: 32px;
  border: none;
`;

const CenterBtn1 = styled.div`
  height: 42px;
  width: 40px;
  flex-direction: column;
  display: flex;
  margin-left: 6px;
  border: none;
`;

const RightBtn1 = styled.div`
  height: 42px;
  width: 40px;
  flex-direction: column;
  display: flex;
  margin-left: 8px;
  margin-top: 5px;
  border: none;
`;

const ActionBodyRow = styled.div`
  height: 52px;
  flex-direction: row;
  display: flex;
  margin-top: 19px;
  margin-left: 1px;
  margin-right: 22px;
`;

export default MaterialCard12;
