import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";
import ButtonBig from "./ButtonBig";
import ButtonFancy from "./ButtonFancy";
import Transitioner from "./Transitioner";
import { axiosInstance } from "../axiosApi";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.timeofday = "";
    this.state = {
      name: "", hover_return: false
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
    this.enterhover_return = this.enterhover_return.bind(this);
    this.exithover_return = this.exithover_return.bind(this);

    this.current_gradient = `linear-gradient(180deg, #DDAF77 20%, #ffffff 85%)`;
    this.gradient_buffer = localStorage.getItem("grad_buffer");
    // "prevent" transition on direct url
    this.gradient_buffer = this.gradient_buffer ?? this.current_gradient;
    localStorage.setItem("grad_buffer", this.current_gradient);

  }

  enterhover_return() {
    this.setState({ ['hover_return']: true });
  }
  exithover_return() {
    this.setState({ ['hover_return']: false });
  }
  // just for the name
  async componentDidMount(event) {
    try {
      axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
      const response = await axiosInstance.get('/user/update/', { method: 'get' });
      this.setState({ name: response.data.fullname });
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
      window.location.replace('http://localhost:8000/Splash/');
      return response;
    }
    catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <Container>
        <Transitioner in={this.current_gradient} out={this.gradient_buffer}></Transitioner>
        <Logo src={"https://i.ibb.co/bFRMRGm/fuel23.png"}></Logo>
        <Greeting>{"Good " + this.timeofday + ", " + this.state.name.split(" ")[0] + "."}</Greeting>
        <Prompt>What would you like to do today?</Prompt>
        <Navigator>
          <Pill to="/QuoteHistory">
            <QuoteHistory>
              <ButtonOverlay>
                <ButtonHist
                  style={{
                    width: 420,
                    height: 120,
                    borderTopLeftRadius: 100,
                    borderBottomLeftRadius: 100
                  }}
                  button="Review Quote History."
                ></ButtonHist>
              </ButtonOverlay>
            </QuoteHistory>
          </Pill>
          <Pill to="/QuoteForm">
            <FuelQuote>
              <ButtonOverlay>
                <ButtonForm
                  style={{
                    width: 420,
                    height: 120
                  }}
                  button="Create Fuel Quote."
                ></ButtonForm>
              </ButtonOverlay>
            </FuelQuote>
          </Pill>
          <Pill to="/Profile">
            <ProfileManagement>
              <ButtonOverlay>
                <ButtonProf
                  style={{
                    width: 420,
                    height: 120,
                    borderTopRightRadius: 100,
                    borderBottomRightRadius: 100
                  }}
                  button="Manage User Profile."
                ></ButtonProf>
              </ButtonOverlay>
            </ProfileManagement>
          </Pill>
        </Navigator>
        <SignOut onClick={this.handleLogout}>
          <ButtonOverlay>
            <ButtonFancy hover={this.state.hover_return} onMouseEnter={this.enterhover_return} onMouseLeave={this.exithover_return}
              button="Button"
              style={{
                height: 34,
                width: 90,
                borderRadius: 100
              }}
              button="Sign Out"
            ></ButtonFancy>
          </ButtonOverlay>
        </SignOut>
        <br />

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
  flex-direction: column;
  align-items: center;
  display: block;
  background: none;
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

const Pill = styled(Link)`
  text-decoration: none;
`

const ButtonHist = styled(ButtonBig)`
  background-color: #FF6363;
	&:hover ${ButtonHist} {
    background-color: #DB4D4D;
  }
`
const ButtonForm = styled(ButtonBig)`
  &:hover ${ButtonForm} {
    background-color: #0667D0;
  }
`
const ButtonProf = styled(ButtonBig)`
  background-color: #34D952;
	&:hover ${ButtonProf} {
    background-color: #33B94B;
  }
`

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

const SignOut = styled.div`
  display: flex;
  justify-content: 'center';
  flex-direction: column;
  height: 44px;
  padding: 0px;
  margin-bottom: 15px;
  align-self: stretch;
  align-items: center;
`;

export default Dashboard;
