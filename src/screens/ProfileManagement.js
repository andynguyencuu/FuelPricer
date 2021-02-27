import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextFullName from "../components/TextFullName";
import TextAddress1 from "../components/TextAddress1";
import TextAddress2 from "../components/TextAddress2";
import TextCity from "../components/TextCity";
import TextState from "../components/TextState";
import TextZip from "../components/TextZip";
import { Link } from "react-router-dom";
import ButtonSmallBlue from "../components/ButtonSmallBlue";
import ButtonSmallGrey from "../components/ButtonSmallGrey";

function ProfileManagement(props) {
  return (
    <Container
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,213,153,1) 89%)`
      }}
    >
      <LogoSmall src={require("../assets/images/fuel23.png")}></LogoSmall>
      <ProfileDialog>
        <BoxHeader1>
          <Text>PROFILE MANAGEMENT</Text>
        </BoxHeader1>
        <TextFullName
          style={{
            width: 300,
            height: 35,
            marginBottom: 10
          }}
        ></TextFullName>
        <TextAddress1
          style={{
            width: 300,
            height: 35,
            marginBottom: 10
          }}
        ></TextAddress1>
        <TextAddress2
          style={{
            width: 300,
            height: 35,
            marginBottom: 10
          }}
        ></TextAddress2>
        <TextCity
          style={{
            width: 300,
            height: 35,
            marginBottom: 10
          }}
        ></TextCity>
        <TextState
          style={{
            height: 35,
            width: 300,
            marginBottom: 10
          }}
        ></TextState>
        <TextZip
          style={{
            height: 35,
            width: 300,
            marginBottom: 20
          }}
        ></TextZip>
        <Link to="/Dashboard">
          <UpdateProfile>
            <ButtonOverlay>
              <ButtonSmallBlue
                button="Button"
                style={{
                  width: 122,
                  height: 44,
                  marginBottom: 5,
                  alignSelf: "center",
                  backgroundColor: "rgba(70,202,81,1)"
                }}
                button="Update Profile"
              ></ButtonSmallBlue>
            </ButtonOverlay>
          </UpdateProfile>
        </Link>
        <DiscardChanges>
          <ButtonOverlay onClick={() => props.history.goBack()}>
            <ButtonSmallGrey
              style={{
                width: 155,
                height: 44,
                marginBottom: 10,
                alignSelf: "center"
              }}
              caption="Discard Changes"
            ></ButtonSmallGrey>
          </ButtonOverlay>
        </DiscardChanges>
      </ProfileDialog>
      <br></br>
      <Container></Container>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const ButtonOverlay = styled.button`
  display: block;
  background: none;
  height: 100%;
  width: 100%;
  border: none;
`;
const LogoSmall = styled.img`
  width: 130px;
  height: 100%;
  object-fit: contain;
`;

const ProfileDialog = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  height: 473px;
  width: 340px;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  display: flex;
  box-shadow: 3px 3px 10px 0.5px rgba(0, 0, 0, 1);
`;

const BoxHeader1 = styled.div`
  height: 60px;
  background-color: rgba(94, 208, 105, 1);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  width: 340px;
  margin-bottom: 20px;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  align-self: center;
`;

const UpdateProfile = styled.div`
  height: 44px;
  margin: 0px;
  margin-bottom: 5px;
  flex-direction: column;
  display: flex;
  border: none;
`;

const DiscardChanges = styled.div`
  height: 44px;
  margin-bottom: 20px;
  flex-direction: column;
  display: flex;
  border: none;
`;

export default ProfileManagement;
