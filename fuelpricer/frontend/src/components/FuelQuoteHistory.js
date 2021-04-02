import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import ButtonFancy from "./ButtonFancy";
import QuoteCard from "./QuoteCard";
import { axiosInstance } from "../axiosApi";

class FuelQuoteHistory extends Component {
  constructor(props) {
    super(props);
    this.state = [
      { quotePrice: 1.5, 
        quoteCreated: "", 
        gallonsRequested: 1, 
        pricePerGallon: 1.50, 
        deliveryDate: "", 
        deliveryAddress: "" },
    ]
  }
  
  async componentDidMount(event) {
    try {
      const response = await axiosInstance.get('/quote/', { method: 'get' });
      
      // this.setState({ quotePrice: prefill.address + ' ' + prefill.city + ', ' + prefill.state + ' ' + prefill.zipcode });
    } catch (err) {
      alert(err);
    }
  }
  
  makeCards() {
    let cards = []
    for (var i = 0; i < this.state.length; i++) {
      let target = this.state[i];
      console.log(target.quotePrice + '\n' + target.quoteCreated + '\n' + target.gallonsRequested + '\n' + target.pricePerGallon + '\n' + target.deliveryDate + '\n' + target.deliveryAddress)
      cards.push(<QuoteCard
        style={{
          width: 400,
          height: 214,
          marginBottom: 15
        }}
        quotePrice={"$" + this.state[0].quotePrice}
        quoteCreated={"Created" + this.state[0].quoteCreated}
        gallonsRequested={this.state[0].gallonsRequested + " gallons"}
        pricePerGallon={this.state[0].pricePerGallon + " per gallon"}
        deliveryDate={this.state[0].deliveryDate}
        deliveryAddress={this.state[0].deliveryAddress}
      ></QuoteCard>)
    }
    return cards
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
          {this.makeCards()}
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
