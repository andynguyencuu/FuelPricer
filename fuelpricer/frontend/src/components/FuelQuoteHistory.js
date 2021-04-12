import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import ButtonFancy from "./ButtonFancy";
import QuoteCard from "./QuoteCard";
import axiosInstance from "../axiosApi";
import Transitioner from "./Transitioner";

class FuelQuoteHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { hover_return: false }
    
    this.quotes = {};
    this.cards = [];
    this.togglehover_return = this.togglehover_return.bind(this);

    this.current_gradient = `linear-gradient(180deg, #ddaf77 20%, #ffffff 90%)`;
    this.gradient_buffer = localStorage.getItem("grad_buffer");
    // "prevent" transition on direct url
    this.gradient_buffer = this.gradient_buffer ?? this.current_gradient;
    localStorage.setItem("grad_buffer", this.current_gradient);
  }
  
  togglehover_return() {
    this.setState({ ['hover_return']: !this.state.hover_return })
  }
  
  
  async componentDidMount(event) {
    try {
      axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
      const response = await axiosInstance.get('/quote/', { method: 'get' });
      this.quotes= response.data;
      this.setState(this.makeCards());
    } catch (err) {
      alert(err);
    }
  }
  
  makeCards() {
    let cards = []
    let morph = Object.keys(this.quotes)
    for (var i = 0; i < morph.length; i++) {
      let target = this.quotes[morph[i]];
      cards.push(<QuoteCard
        key={i}
        style={{
          width: 400,
          height: 214,
          marginBottom: 15,
        }}
        quotePrice={parseFloat(target.quotePrice).toLocaleString('en-US', { style:'currency', currency: 'USD'})}
        quoteCreated={"Created " + target.dateOfQuote}
        gallonsRequested={parseFloat(target.gallonsRequested).toLocaleString() + " gallons"}
        pricePerGallon={parseFloat(target.pricePerGallon).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + " per gallon"}
        deliveryDate={target.dateRequested.slice(5,7) + '/' + target.dateRequested.slice(8,10) + '/' + target.dateRequested.slice(0,4)}
        deliveryAddress={target.address}
      ></QuoteCard>)
    }
    return cards
  }
  
  render() {
    return (
      <Container>
      <Transitioner in={this.current_gradient} out={this.gradient_buffer}></Transitioner>
        <HeaderGroup>
          <Logo src={"https://i.ibb.co/bFRMRGm/fuel23.png"}></Logo>
          <Header>Fuel Quote History</Header>
          <Link to="/Dashboard">
            <Return>
              <ButtonOverlay>
                <ButtonFancy hover={ this.state.hover_return } onMouseEnter={ this.togglehover_return } onMouseLeave={ this.togglehover_return }
                  button="Button"
                  style={{
                    height: 34,
                    width: 80,
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
          {Object.values(this.state).reverse()}

        </QuoteList>
      </Container>
    );
  }
}

const Container = styled.div`
display: flex;
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

const Logo = styled.img`
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
