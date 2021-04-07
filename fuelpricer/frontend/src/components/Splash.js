import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextUser from "./TextUser";
import TextPassword from "./TextPassword";
import { Link } from "react-router-dom";
import ButtonSmallBlue from "./ButtonSmallBlue";
import ButtonSmallGrey from "./ButtonSmallGrey";
import InlineError from "./InlineError"
import { axiosInstance } from "../axiosApi";

class Splash extends Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "", error: false, error_msg: "" };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleError(err) {
		this.setState({ ['error']: true, ['error_msg']: err });
		return setTimeout(function () { this.setState({ ['error']: false }) }.bind(this), 4000);
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
			if (err.response) {
				if (err.response.status >= 500) this.handleError("Server error.");
			}
			else this.handleError("Invalid user ID/password.")
			return;
		}
	}

	render() {
		return (
			<Container
				style={{
					backgroundImage: `linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,213,153,1) 89%)`
				}}
			>
				<Logo src={"https://i.ibb.co/bFRMRGm/fuel23.png"}></Logo>
				<SignInDialog>
					<BoxHeader>
						<Header1>ACCOUNT SIGN IN!</Header1>
					</BoxHeader>
					<form onSubmit={this.handleSubmit}>
						<TextUser
							name="username" type="text" value={this.state.username} onChange={this.handleChange}
							style={{
								width: 300,
								height: 35,
								marginRight: 20,
								marginLeft: 20,
								marginBottom: 10
							}}
						></TextUser>
						<TextPassword
							name="password" type="password" value={this.state.password} onChange={this.handleChange}
							style={{
								width: 300,
								height: 35,
								marginRight: 20,
								marginLeft: 20,
								marginBottom: 15
							}}
						></TextPassword>
						<InlineError error={this.state.error}>
							{this.state.error_msg}
						</InlineError>
						<SignIn
							type="submit" value="Sign In">
							<ButtonOverlay>
								<ButtonSmallBlue
									style={{
										width: 85,
										height: 44,
										margin: 0,
										marginLeft: 106,
										marginBottom: 0
									}}
									button="Sign In"
								></ButtonSmallBlue>
							</ButtonOverlay>
						</SignIn>
						<Link to="/Registration">
							<Register>
								<ButtonOverlay>
									<ButtonSmallGrey
										style={{
											width: 100,
											height: 44,
											margin: 0,
											marginLeft: 100,
										}}
										caption="Register"
									></ButtonSmallGrey>
								</ButtonOverlay>
							</Register>
						</Link>
					</form>
				</SignInDialog>
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
  margin: -8px -8px -8px -8px;
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

const SignInDialog = styled.div`
  flex-direction: column;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  align-items: center;
  margin-bottom: 80px;
  margin-top: 50px;
  display: flex;
  box-shadow: 3px 3px 10px 0.5px rgba(0, 0, 0, 1);
`;

const BoxHeader = styled.div`
  height: 60px;
  background-color: rgba(48, 116, 209, 1);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  width: 340px;
  margin: 0px;
  margin-bottom: 20px;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const Header1 = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  align-self: center;
`;

const SignIn = styled.div`
  display: flex;
  justify-content: 'center';
  flex-direction: column;
  height: 44px;
  padding: 0px;
  margin-bottom: 5px;
  align-self: stretch;
  align-items: center;
  border: none;
`;

const Register = styled.div`
  flex-direction: column;
  height: 44px;
  margin-bottom: 15px;
  align-self: stretch;
  align-items: center;
  border: none;
`;

export default Splash;
