import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import ButtonBig from "../components/ButtonBig";
import ButtonFancy from "../components/ButtonFancy";
import { rgbToHex } from "@material-ui/core";

function Dashboard(props) {
  return (
    <Container
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(242,213,153,1) 20%, #FFFFFF 90%)`
      }}
    >
      <Logo src={require("../assets/images/fuel23.png")}></Logo>
      <Greeting>Good afternoon, *Client*.</Greeting>
      <Prompt>What would you like to do today?</Prompt>
      <Navigator>
        <Link to="/FuelQuoteHistory">
          <QuoteHistory>
            <ButtonOverlay>
              <ButtonBig
                button="Button"
                style={{
                  width: 420,
                  height: 120,
                  borderTopLeftRadius: 100,
                  borderBottomLeftRadius: 100,
                  backgroundColor: "rgba(255,99,99,1)"
                }}
                button="Review Quote History"
              ></ButtonBig>
            </ButtonOverlay>
          </QuoteHistory>
        </Link>
        <Link to="/FuelQuoteForm">
          <FuelQuote>
            <ButtonOverlay>
              <ButtonBig
                style={{
                  width: 420,
                  height: 120
                }}
                button="New Fuel Quote"
              ></ButtonBig>
            </ButtonOverlay>
          </FuelQuote>
        </Link>
        <Link to="/ProfileManagement">
          <ProfileManagement>
            <ButtonOverlay>
              <ButtonBig
                style={{
                  width: 420,
                  height: 120,
                  borderTopRightRadius: 100,
                  borderBottomRightRadius: 100,
                  backgroundColor: "rgba(52,217,82,1)"
                }}
                button="Profile Management"
              ></ButtonBig>
            </ButtonOverlay>
          </ProfileManagement>
        </Link>
      </Navigator>
      <Link to="/Splash">
        <Button6>
          <ButtonOverlay>
            <ButtonFancy
              button="Button"
              style={{
                height: 44,
                width: 100,
                borderRadius: 100
              }}
              button="Sign Out"
            ></ButtonFancy>
          </ButtonOverlay>
        </Button6>
      </Link>
      <br />

      <Container></Container>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-size: 100%;
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

const Greeting = styled.span`
  font-family: Abril Fatface;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  /* color: #ffffff; */
  height: 72px;
  font-size: 50px;
  text-align: center;
  text-shadow: 2px 2px #ffffff;
  width: 100vw;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Prompt = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  color: #121212;
  font-size: 20px;
  text-align: center;
  text-shadow: 2px 2px #ffffff;
  height: 24px;
  align-self: center;
`;

const Navigator = styled.div`
  width: 1260px;
  height: 120px;
  flex-direction: row;
  margin-top: 80px;
  margin-bottom: 80px;
  left: 53px;
  top: 476px;
  flex-wrap: wrap;
  display: flex;
`;

const QuoteHistory = styled.div`
  flex-direction: row;
  width: 420px;
  height: 120px;
  border: none;
`;

const FuelQuote = styled.div`
  flex-direction: row;
  width: 420px;
  height: 120px;
  border: none;
`;

const ProfileManagement = styled.div`
  flex-direction: row;
  width: 420px;
  height: 120px;
  border: none;
`;

const Button6 = styled.div`
  flex-direction: column;
  width: 100px;
  height: 44px;
  border: none;
`;

export default Dashboard;
