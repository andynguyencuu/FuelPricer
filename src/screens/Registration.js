import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextUser from "../components/TextUser";
import TextPassword from "../components/TextPassword";
import { Link } from "react-router-dom";
import ButtonSmallBlue from "../components/ButtonSmallBlue";

function Registration(props) {
  return (
    <Container
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,213,153,1) 89%)`
      }}
    >
      <Logo src={require("../assets/images/fuel23.png")}></Logo>
      <RegisterDialog>
        <BoxHeader>
          <RegisterAccount>REGISTER ACCOUNT</RegisterAccount>
        </BoxHeader>
        <TextUser
          inputStyle="Label"
          style={{
            width: 300,
            height: 35,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 10
          }}
          inputStyle="User ID"
        ></TextUser>
        <TextPassword
          style={{
            width: 300,
            height: 35,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 10
          }}
        ></TextPassword>
        <TextPassword
          inputStyle="Password"
          style={{
            width: 300,
            height: 35,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 20
          }}
          inputStyle="Confirm Password"
        ></TextPassword>
        <Link to="/ProfileManagement">
          <Button>
            <ButtonOverlay>
              <ButtonSmallBlue
                style={{
                  width: 100,
                  height: 44,
                  margin: 0,
                  backgroundColor: "rgba(219,87,147,1)"
                }}
                button="Register"
              ></ButtonSmallBlue>
            </ButtonOverlay>
          </Button>
        </Link>
      </RegisterDialog>
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
const Logo = styled.img`
  width: 174px;
  height: 100%;
  margin-top: 50px;
  object-fit: contain;
`;

const RegisterDialog = styled.div`
  flex-direction: column;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  align-items: center;
  width: 340px;
  margin-top: 60px;
  margin-bottom: 80px;
  display: flex;
  box-shadow: 3px 3px 10px 0.5px rgba(0, 0, 0, 1);
`;

const BoxHeader = styled.div`
  height: 60px;
  background-color: rgba(219, 87, 147, 1);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  width: 340px;
  margin: 0px;
  margin-bottom: 20px;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const RegisterAccount = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  align-self: center;
`;

const Button = styled.div`
  height: 44px;
  margin-bottom: 15px;
  align-self: stretch;
  align-items: center;
  flex-direction: column;
  display: flex;
  border: none;
`;

export default Registration;
