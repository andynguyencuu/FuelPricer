import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialCardWithoutImage(props) {
  return (
    <Container {...props}>
      <BodyContent>
        <TitleStyle>Title goes here</TitleStyle>
        <SubtitleStyle>Subtitle here</SubtitleStyle>
      </BodyContent>
      <Body>
        <BodyText>
          BuilderX is a screen design tool which codes React Native for you
          which design without boundaries, the code is generated simultaneously.
          Save your designed components as symbol and then simply add it to your
          design next time.Live preview works on real device. Shout out to the
          Expo team to make it happen.
        </BodyText>
      </Body>
      <ActionBody>
        <ActionButton1>
          <ButtonOverlay>
            <ActionText1>ACTION 1</ActionText1>
          </ButtonOverlay>
        </ActionButton1>
        <ActionButton2>
          <ButtonOverlay>
            <ActionText2>ACTION 2</ActionText2>
          </ButtonOverlay>
        </ActionButton2>
      </ActionBody>
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
const BodyContent = styled.div`
  padding: 16px;
  padding-top: 24px;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

const TitleStyle = styled.span`
  font-family: Roboto;
  font-size: 24px;
  color: #000;
  padding-bottom: 12px;
`;

const SubtitleStyle = styled.span`
  font-family: Roboto;
  font-size: 14px;
  color: #000;
  line-height: 16px;
  opacity: 0.5;
`;

const Body = styled.div`
  padding: 16px;
  padding-top: 8px;
  flex-direction: column;
  display: flex;
`;

const BodyText = styled.span`
  font-family: Arial;
  line-height: 20px;
  font-size: 14px;
  color: #424242;
  flex-wrap: wrap;
`;

const ActionBody = styled.div`
  padding: 8px;
  flex-direction: row;
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

const ActionText2 = styled.span`
  font-family: Arial;
  font-size: 14px;
  color: #000;
  opacity: 0.9;
`;

export default MaterialCardWithoutImage;
