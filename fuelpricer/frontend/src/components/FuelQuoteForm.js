import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextGallonsRequested from "./TextGallonsRequested";
import CalendarDeliveryDate from "./CalendarDeliveryDate";
import PrefilledPricePerGallon from "./PrefilledPricePerGallon";
import PrefilledDeliveryAddress from "./PrefilledDeliveryAddress";
import ButtonSmallBlue from "./ButtonSmallBlue";
import { Link } from "react-router-dom";
import ButtonFancy from "./ButtonFancy";
import PrefilledTotalAmountDue from "./PrefilledTotalAmountDue";
import { axiosInstance } from "../axiosApi";

class FuelQuoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = { gallonsRequested: "", dateRequested: "", address: "", address_2: "", quotePrice: ""};

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount(event) {
    axios({
      method: "get",
      url: "http://localhost:8000/api/user/update/", //also functions as retrieve function due to 
      data: {},
      headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
      .then(function (response) {
        console.log(response);
        this.setState({address: response.data.address+ ' ' + response.data.city + ', ' + response.data.state + ' ' + response.data.zipcode});
      }.bind(this))      
      .catch(function (response) {
        //handle error
        //alert(response);
      });
    }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const data = await axiosInstance.post('/token/obtain/', {
        username: this.state.username,
        password: this.state.password
      }, { method: 'post' });
      localStorage.setItem('access_token', data.data.access);
      localStorage.setItem('refresh_token', data.data.refresh);
      axiosInstance.defaults.headers['Authorization'] = "JWT " + data.data.access;

      // TODO 
      //  CHECK REQ'D FIELDS FOR EMPTY. IF EMPTY REDIR → PROF MANAGEMENT
      // Object = ????? 
      // if (Object.values(this.state).slice(0, 2).concat(Object.values(this.state).slice(3,6)).includes(""))
      // for if a user quits after registering or something
      window.location.replace('http://localhost:8000/Dashboard/');
    } catch (err) {
      alert(err);
      return;
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
          <form onSubmit={this.handleSubmit}>
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
          <CalendarDeliveryDate
          name="dateRequested" type="text" value={this.state.dateRequested} onChange={this.handleChange}
            style={{
              width: 300,
              height: 35,
              marginBottom: 10,
              marginRight: 20,
              marginLeft: 20
            }}
          ></CalendarDeliveryDate>
          <PrefilledPricePerGallon
          name="priceperquote" type="text"  onChange={this.handleChange}
            style={{
              width: 300,
              height: 65,
              marginBottom: 0,
              marginRight: 20,
              marginLeft: 20
            }}
          ></PrefilledPricePerGallon>
          <PrefilledDeliveryAddress
          name="address" type="text" value={this.state.address} onChange={this.handleChange}
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
          type = "submit" value="Generate">
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
          <BoxHeader1>
            <YourFuelQuote>YOUR FUEL QUOTE</YourFuelQuote>
          </BoxHeader1>
          <PrefilledTotalAmountDue
            style={{
              width: 300,
              height: 65,
              marginBottom: 20
            }}
          ></PrefilledTotalAmountDue>
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
