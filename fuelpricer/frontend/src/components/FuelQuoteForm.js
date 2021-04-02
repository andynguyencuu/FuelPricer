import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextGallonsRequested from "./TextGallonsRequested";
import PrefilledPricePerGallon from "./PrefilledPricePerGallon";
import PrefilledDeliveryAddress from "./PrefilledDeliveryAddress";
import ButtonSmallBlue from "./ButtonSmallBlue";
import ButtonSmallGreen from "./ButtonSmallGreen";
import { Link } from "react-router-dom";
import ButtonFancy from "./ButtonFancy";
import PrefilledTotalAmountDue from "./PrefilledTotalAmountDue";
import { axiosInstance } from "../axiosApi";
import {DatePickerInput } from 'rc-datepicker';
import "../cal-style.css";

class FuelQuoteForm extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = { gallonsRequested: 0, dateOfQuote: date, dateRequested: "", address: "", address_2: "", pricePerGallon: 1.50, quotePrice: "" };
    // todo: copy this.state into ↓ when "Generate", use for "Accept"
    this.quote_buffer = {}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generate = this.generate.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async componentDidMount(event) {
    try {
      axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
      const response = await axiosInstance.get('/user/update/', { method: 'get' });
      let prefill = response.data;
      this.setState({ address: prefill.address + ' ' + prefill.city + ', ' + prefill.state + ' ' + prefill.zipcode });
    } catch (err) {
      alert(err);
    }
  }

  async generate(event) {
    event.preventDefault();
    try {
      if ([this.state.gallonsRequested, this.state.dateRequested].includes("")) {
        alert("Please answer required fields!");
        return;
      }
      const data = await axiosInstance.patch('/quote/', {
        gallonsRequested: this.state.gallonsRequested,
        dateRequested: this.state.dateRequested
      }, { method: 'patch' });
      console.log(data.data)
      this.setState({ quotePrice: data.data.generated })
    } catch (err) {
      alert(err);
      return;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      if (this.state.quotePrice == "") {
        alert("A quote hasn't been generated yet!\nPlease use 'Generate'.");
        return;
      }
      const data = await axiosInstance.post('/quote/', {
        gallonsRequested: this.state.gallonsRequested,
        pricePerGallon: this.state.pricePerGallon,
        dateOfQuote: this.state.dateOfQuote,
        dateRequested: this.state.dateRequested,
        address: this.state.address,
        address_2: this.state.address_2,
        quotePrice: this.state.quotePrice
      }, { method: 'post' });
      alert("Quote accepted!")
      setTimeout(() => {
        window.location.replace('http://localhost:8000/Dashboard/');
      }, 1000);
      return;
    } catch (err) {
      alert(err);
    }
  }


  render() {
    return (
      <Container
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(242,213,153,1) 20%, #FFFFFF 90%)`
        }}
      >
        <QuoteForm>
          <BoxHeader>
            <Text>FUEL QUOTE FORM</Text>
          </BoxHeader>
          <form onSubmit={this.generate}>
            <TextGallonsRequested
              name="gallonsRequested" type="text" value={this.state.gallonsRequested} onChange={this.handleChange}
              style={{
                width: 300,
                height: 35,
                marginBottom: 10,
                marginRight: 20,
                marginLeft: 20
              }}
            ></TextGallonsRequested>
            <DatePickerInput
              displayFormat='MM/DD/YYYY'
              returnFormat='MM/DD/YYYY'
              className='deliveryDate'
              valueLink={{
                value: this.state.dateRequested,
                requestChange: dateRequested => this.setState({ dateRequested })
              }}
              showOnInputClick
              placeholder='Delivery Date'
              locale='en'
              style={{
                width: 300,
                height: 35,
                marginBottom: 10,
                marginRight: 20,
                marginLeft: 20,
              }}
            />

            <PrefilledPricePerGallon
              name="pricepergallon" type="text" value={this.state.pricePerGallon.toFixed(2)}
              style={{
                width: 300,
                height: 65,
                marginBottom: 0,
                marginRight: 20,
                marginLeft: 20
              }}
            ></PrefilledPricePerGallon>
            <PrefilledDeliveryAddress
              name="address" type="text" value={this.state.address}
              style={{
                width: 300,
                height: 65,
                marginBottom: 20,
                marginRight: 20,
                marginLeft: 20
              }}
            ></PrefilledDeliveryAddress>
            {/* TODO: Add in city, state, and zipcode for address to complete pricing module */}
            <ButtonOverlay
              type="submit" value="Generate">
              <ButtonSmallBlue
                style={{
                  width: 100,
                  height: 44,
                  marginBottom: 20,
                  marginRight: 20,
                  marginLeft: 95
                }}
                button="Generate"
              ></ButtonSmallBlue>
            </ButtonOverlay>
          </form>
        </QuoteForm>
        <Group1>
          <Logo1 src={require("../assets/images/fuel23.png")}></Logo1>
          <Link to="/Dashboard">
            <Button1>
              <ButtonOverlay>
                <ButtonFancy
                  button="Button"
                  style={{
                    height: 44,
                    width: 100,
                    borderRadius: 100,
                    marginBottom: 0
                  }}
                  button="Return"
                ></ButtonFancy>
              </ButtonOverlay>
            </Button1>
          </Link>
        </Group1>
        <QuoteOutput>
          <form onSubmit={this.handleSubmit}>
            <BoxHeader1>
              <YourFuelQuote>YOUR FUEL QUOTE</YourFuelQuote>
            </BoxHeader1>
            <PrefilledTotalAmountDue
              name="totalamountdue" type="text" value={this.state.quotePrice}
              style={{
                width: 300,
                height: 65,
                marginLeft: 20,
                marginBottom: 20
              }}
            ></PrefilledTotalAmountDue>
            <ButtonOverlay
              type="submit" value="Accept"> 
              <ButtonSmallGreen
                style={{
                  width: 100,
                  height: 44,
                  marginTop: -50,
                  marginBottom: 20,
                  marginRight: 20,
                  marginLeft: 95
                }}
                button="Accept"
              ></ButtonSmallGreen>
            </ButtonOverlay>
          </form>
        </QuoteOutput>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  background-color: rgba(230, 230, 230, 1);
  flex-direction: row;
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
const QuoteForm = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  flex-direction: column;
  align-items: center;
  width: 340px;
  display: flex;
  box-shadow: 3px 3px 10px 0.5px rgba(0, 0, 0, 1);
`;

const BoxHeader = styled.div`
  height: 60px;
  background-color: rgba(48, 116, 209, 1);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-bottom: 20px;
  align-self: stretch;
  margin-right: 0px;
  margin-left: 0px;
  flex-direction: column;
  display: flex;
`;

const Text = styled.span`
  font-family: Lato;
  height: 19px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  font-weight: 900;
  margin-top: 20px;
`;


const Group1 = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 668px;
  width: 174px;
  display: flex;
`;

const Logo1 = styled.img`
  width: 174px;
  height: 100%;
  margin-bottom: 500px;
  object-fit: contain;
`;

const Button1 = styled.div`
  flex-direction: column;
  width: 100px;
  height: 44px;
  margin-bottom: 50px;
  border: none;
`;

const QuoteOutput = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  flex-direction: column;
  align-items: center;
  height: 155px;
  width: 340px;
  display: flex;
  box-shadow: 3px 3px 10px 0.5px rgba(0, 0, 0, 1);
`;

const BoxHeader1 = styled.div`
  height: 60px;
  background-color: rgba(98, 185, 87, 1);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  width: 340px;
  margin-bottom: 10px;
  flex-direction: column;
  display: flex;
`;

const YourFuelQuote = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  color: rgba(255, 255, 255, 1);
  width: 340px;
  height: 24px;
  text-align: center;
  font-size: 20px;
  margin-top: 18px;
`;

export default FuelQuoteForm;
