import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import ButtonFancy from "./ButtonFancy";
import QuoteCard from "./QuoteCard";

class FuelQuoteHistory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(242,213,153,1) 20%, #FFFFFF 90%)`
        }}
      >
        <HeaderGroup>
          <Logo1 src={require("../assets/images/fuel23.png")}></Logo1>
          <Header>Fuel Quote History</Header>
          <Link to="/Dashboard">
            <Return>
              <ButtonOverlay>
                <ButtonFancy
                  button="Button"
                  style={{
                    height: 44,
                    width: 100,
                    borderRadius: 100,
                    alignSelf: "center"
                  }}
                  button="Return"
                ></ButtonFancy>
              </ButtonOverlay>
            </Return>
          </Link>
        </HeaderGroup>
        <QuoteList>
          <QuoteCard
            style={{
              width: 400,
              height: 214,
              marginBottom: 15
            }}
            quotePrice="$17,896.90"
            quoteCreated="Created 2/25/2021"
            gallonsRequested="7,654 gallons"
            priceGallon="$2.35 per gallon"
            deliveryDate="4/13/2021"
            deliveryAddress="4800 Calhoun Rd, Houston, TX 77004"
          ></QuoteCard>
          <QuoteCard
            style={{
              width: 400,
              height: 214,
              marginBottom: 15
            }}
            quotePrice="$203,955.07"
            quoteCreated="Created 2/19/2021"
            gallonsRequested="81,257 gallons"
            priceGallon="$2.51 per gallon"
            deliveryDate="2/24/2021"
            deliveryAddress="4800 Calhoun Rd, Houston, TX 77004"
          ></QuoteCard>
          <QuoteCard
            style={{
              width: 400,
              height: 214,
              marginBottom: 15
            }}
            quotePrice="$206.57"
            quoteCreated="Created 1/18/2021"
            gallonsRequested="91 gallons"
            priceGallon="$2.27 per gallon"
            deliveryDate="1/31/2021"
            deliveryAddress="4800 Calhoun Rd, Houston, TX 77004"
          ></QuoteCard>
          <QuoteCard
            style={{
              width: 400,
              height: 214,
              marginBottom: 15
            }}
            quotePrice="$21,170.10"
            quoteCreated="Created 12/31/2020"
            gallonsRequested="8,302 gallons"
            priceGallon="$2.55 per gallon"
            deliveryDate="1/21/2021"
            deliveryAddress="4800 Calhoun Rd, Houston, TX 77004"
          ></QuoteCard>
          <QuoteCard
            style={{
              width: 400,
              height: 214,
              marginBottom: 15
            }}
            quotePrice="$4,964,873.08"
            quoteCreated="Created 11/2/2020"
            gallonsRequested="1,700,299 gallons"
            priceGallon="$2.92 per gallon"
            deliveryDate="12/5/2021"
            deliveryAddress="4800 Calhoun Rd, Houston, TX 77004"
          ></QuoteCard>
        </QuoteList>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  background-color: rgba(242, 213, 153, 1);
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
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
const HeaderGroup = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
`;

const Logo1 = styled.img`
  width: 174px;
  height: 100%;
  margin-bottom: 20px;
  object-fit: contain;
`;

const Header = styled.span`
  font-family: Calistoga;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 99, 99, 1);
  height: 54px;
  font-size: 40px;
  text-align: center;
  text-shadow: 2px 2px #ffffff;
  width: 441px;
  margin: 0px;
  margin-bottom: 20px;
`;

const Return = styled.div`
  height: 44px;
  margin: 0px;
  margin-bottom: 20px;
  align-self: stretch;
  flex-direction: column;
  display: flex;
  border: none;
`;

const QuoteList = styled.div`
  height: 214px;
  flex-direction: column;
  align-items: center;
  width: 400px;
  display: flex;
`;

export default FuelQuoteHistory;
