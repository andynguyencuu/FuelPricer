import React, { Component, useState } from "react";
import styled, { css } from "styled-components";
import TextUser from "./TextUser";
import TextPassword from "./TextPassword";
import { Link } from "react-router-dom";
import ButtonSmallBlue from "./ButtonSmallBlue";
import ButtonSmallGrey from "./ButtonSmallGrey";
import InlineError from "./InlineError"
import Transitioner from "./Transitioner";

import { axiosInstance } from "../axiosApi";

class Splash extends Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "", error: false, error_msg: "", hover_signin: false, hover_register: false };
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.enterhover_signin = this.enterhover_signin.bind(this);
		this.exithover_signin = this.exithover_signin.bind(this);
		this.enterhover_register  = this.enterhover_register.bind(this);
		this.exithover_register  = this.exithover_register.bind(this);

		this.current_gradient = `linear-gradient(180deg, #ffffff 0%, #ddaf77 89%)`;

		this.gradient_buffer = localStorage.getItem("grad_buffer");
		// "prevent" transition on direct url
		this.gradient_buffer = this.gradient_buffer ?? `none`;
		localStorage.setItem("grad_buffer", this.current_gradient);

	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
	
	handleError(err) {
		this.setState({ ['error']: true, ['error_msg']: err });
		return setTimeout(function () { this.setState({ ['error']: false }) }.bind(this), 4000);
	}

	enterhover_signin() {
		this.setState({['hover_signin']: true})
	}
	exithover_signin() {
		this.setState({['hover_signin']: false})
	}
	enterhover_register() {
		this.setState({['hover_register']: true})
	}
	exithover_register() {
		this.setState({['hover_register']: false})
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
				if (err.response.status >= 500) return this.handleError("Server error.");
				else return this.handleError("Please enter your user ID & password.")
			}
			else return this.handleError("Invalid user ID/password.");
		}
	}
	
	render() {
		return (
			<Container>
				<Transitioner in={this.current_gradient} out={this.gradient_buffer}></Transitioner>
				<Logo src={"https://i.ibb.co/bFRMRGm/fuel23.png"}></Logo>
				<SignInDialog>
					<BoxHeader>
						<Header1>ACCOUNT SIGN IN</Header1>
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
								<ButtonSmallBlue hover={this.state.hover_signin} onMouseEnter={this.enterhover_signin} onMouseLeave={this.exithover_signin}
									style={{
										width: 80,
										height: 34
									}}
									caption="Sign In"
								></ButtonSmallBlue>
							</ButtonOverlay>
						</SignIn>
							<Register to="/Registration">
								<ButtonOverlay>
									<ButtonSmallGrey hover={this.state.hover_register} onMouseEnter={this.enterhover_register} onMouseLeave={this.exithover_register}
										style={{
											width: 92,
											height: 34
										}}
										caption="Register"
										></ButtonSmallGrey>
										</ButtonOverlay>
							</Register>
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
`;

const Register = styled(Link)`
  display: flex;
  justify-content: 'center';
  flex-direction: column;
  height: 44px;
  padding: 0px;
  margin-bottom: 15px;
  align-self: stretch;
  align-items: center;
	text-decoration: none;
`;

export default Splash;
