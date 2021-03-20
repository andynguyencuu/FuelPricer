import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextUser from "./TextUser";
import TextPassword from "./TextPassword";
import TextPasswordConf from "./TextPasswordConf";
import { Link } from "react-router-dom";
import ButtonSmallBlue from "./ButtonSmallBlue";
import axios from "axios";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordconf: "",
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('A username and password was submitted: ' + this.state.username + ":" + this.state.password);
    axios({           // CREATE USER
      method: "post",
      url: "http://localhost:8000/api/user/create/",
      data: {username: this.state.username, password: this.state.password},
      headers: {        
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json' },
      })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    setTimeout(()=> axios({           // USE TO SIGN IN
      method: "post",
      url: "http://localhost:8000/api/token/obtain/",
      data: { username: this.state.username, password: this.state.password },
      headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
      .then(function (response) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        //handle success
        //Change later
        window.location.replace('http://localhost:8000/Profile/')
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      }), 1000)

  }

  render() {
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
          <form onSubmit={this.handleSubmit}>
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
            name="username" type="text" value={this.state.username} onChange={this.handleChange}
          ></TextUser>
            <TextPassword secureTextEntry={true}
            style={{
              width: 300,
              height: 35,
              marginRight: 20,
              marginLeft: 20,
              marginBottom: 10
            }}
            name="password" type="password" value={this.state.password} onChange={this.handleChange}
          ></TextPassword>
          <TextPasswordConf
            inputStyle="Password"
            style={{
              width: 300,
              height: 35,
              marginRight: 20,
              marginLeft: 20,
              marginBottom: 20
            }}
            name="passwordconf" type="password" value={this.state.passwordconf} onChange={this.handleChange}
            inputStyle="Confirm Password"
          ></TextPasswordConf>
            <Button type="submit" value="Register">
              <ButtonOverlay>
                <ButtonSmallBlue
                  style={{
                    width: 100,
                    height: 44,
                    marginBottom: 100,
                    marginLeft: 95,
                    backgroundColor: "rgba(219,87,147,1)"
                  }}
                  button="Register"
                ></ButtonSmallBlue>
              </ButtonOverlay>
            </Button>
            </form>
        </RegisterDialog>
        <br></br>
        <Container></Container>
      </Container>
    );
  }
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
  border: none;
`;

export default Registration;
