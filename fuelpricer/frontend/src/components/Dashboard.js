import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import ButtonBig from "./ButtonBig";
import ButtonFancy from "./ButtonFancy";
import { axiosInstance } from "../axiosApi";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.timeofday = "";
    this.state = {
      name: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
    switch (today.getHours()) {
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        this.timeofday = "morning";
        break;
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
        this.timeofday = "afternoon";
        break;
      case 17:
      case 18:
      case 19:
      case 20:
      case 21:
        this.timeofday = "evening";
        break;
      default:
        this.timeofday = "night";
        break;
    }
  }

  // just for the name
  async componentDidMount(event) {
    try {
      axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
      const response = await axiosInstance.get('/user/update/', { method: 'get' });
      this.setState({ name: response.data.fullname});
    } catch (err) {
      alert(err);
    }
  }

  async handleLogout() {
    try {
      console.log("here");
        // const response = await axiosInstance.post('/blacklist/', {
        //     "refresh_token": localStorage.getItem("refresh_token")
        // });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        return response;
    }
    catch (e) {
        console.log(e);
    }
};

  render() {
    return (
      <Container
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(242,213,153,1) 20%, #FFFFFF 90%)`
        }}
      >
        <Logo src={"https://i.ibb.co/bFRMRGm/fuel23.png"}></Logo>
        <Greeting>{"Good " + this.timeofday + ", " + this.state.name.split(" ")[0] + "."}</Greeting>
        <Prompt>What would you like to do today?</Prompt>
        <Navigator>
          <Link to="/QuoteHistory">
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
                  button="Review Quote History."
                ></ButtonBig>
              </ButtonOverlay>
            </QuoteHistory>
          </Link>
          <Link to="/QuoteForm">
            <FuelQuote>
              <ButtonOverlay>
                <ButtonBig
                  style={{
                    width: 420,
                    height: 120
                  }}
                  button="Create Fuel Quote."
                ></ButtonBig>
              </ButtonOverlay>
            </FuelQuote>
          </Link>
          <Link to="/Profile">
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
                  button="Manage User Profile."
                ></ButtonBig>
              </ButtonOverlay>
            </ProfileManagement>
          </Link>
        </Navigator>
        <Link to="/Splash">
          <Button6 onClick={this.handleLogout}>
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
}

const Container = styled.div`
  display: flex;
  background-size: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -8px -8px -8px -8px;
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
