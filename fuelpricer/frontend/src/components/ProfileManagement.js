import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextFullName from "./TextFullName";
import TextAddress1 from "./TextAddress1";
import TextAddress2 from "./TextAddress2";
import TextCity from "./TextCity";
import TextState from "./TextState";
import TextZip from "./TextZip";
import { Link } from "react-router-dom";
import ButtonSmallBlue from "./ButtonSmallBlue";
import ButtonSmallGrey from "./ButtonSmallGrey";
import axios from 'axios';

class ProfileManagement extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: "", address: "", address_2: "", city:"", st:"", zipcode:0};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  //https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
  handleSubmit(event) {
    alert('User profile update:\n' + this.state.fullname + "\n" + this.state.address + "\n" + this.state.address_2 + "\n" + this.state.city + "\n" + this.state.st + "\n" + this.state.zipcode);
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8000/api/user/update/",
      data: { fullname:this.state.fullname, address:this.state.address, address_2:this.state.address_2, city:this.state.city, state:this.state.st, zip:this.state.zipcode},
      headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
      .then(function (response) {
        //handle success
        //Change later
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  render() {
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
          <form onSubmit={this.handleSubmit}>
          <TextFullName
            name="fullname" type="text" value={this.state.fullname} onChange={this.handleChange}
            style={{
              width: 300,
              height: 35,
              marginBottom: 10
            }}
          ></TextFullName>
          <TextAddress1
            name="address" type="text" value={this.state.address} onChange={this.handleChange}
            style={{
              width: 300,
              height: 35,
              marginBottom: 10
            }}
          ></TextAddress1>
          <TextAddress2
            name="address_2" type="text" value={this.state.address_2} onChange={this.handleChange}
            style={{
              width: 300,
              height: 35,
              marginBottom: 10
            }}
          ></TextAddress2>
          <TextCity
            name="city" type="text" value={this.state.city} onChange={this.handleChange}
            style={{
              width: 300,
              height: 35,
              marginBottom: 10
            }}
          ></TextCity>
          <TextState
            name="st" type="text" value={this.state.st} onChange={this.handleChange}
            style={{
              height: 35,
              width: 300,
              marginBottom: 10
            }}
          ></TextState>
          <TextZip
            name="zipcode" type="number" value={this.state.zipcode} onChange={this.handleChange}
            style={{
              height: 35,
              width: 300,
              marginBottom: 20
            }}
          ></TextZip>
            <UpdateProfile
             type="submit" value="Sign In">
              <ButtonOverlay>
                <ButtonSmallBlue
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
        </form>
        </ProfileDialog>
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
