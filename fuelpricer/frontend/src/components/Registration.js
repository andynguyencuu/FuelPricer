import React, { Component } from "react";
import styled, { css } from "styled-components";
import TextUser from "./TextUser";
import TextPassword from "./TextPassword";
import TextPasswordConf from "./TextPasswordConf";
import ButtonSmallPink from "./ButtonSmallPink";
import InlineError from "./InlineError"
import axiosInstance from "../axiosApi";

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			passwordconf: "",
			error: false,
			error_msg: "",
			hover_register: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.togglehover_register = this.togglehover_register.bind(this);

	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	togglehover_register() {
		this.setState({ ['hover_register']: !this.state.hover_register })
	}


	handleError(err) {
		this.setState({ ['error']: true, ['error_msg']: err });
		return setTimeout(function () { this.setState({ ['error']: false }) }.bind(this), 4000);
	}

	async handleSubmit(event) {
		event.preventDefault();
		if (this.state.username == "") return this.handleError("Please provide a user ID!");
		if (this.state.password == "") return this.handleError("Please provide a password!");
		if (this.state.password != this.state.passwordconf) return this.handleError("Passwords must match!");
		try {		// CREATE USER
			await axiosInstance.post('/user/create/', {
				username: this.state.username,
				password: this.state.password
			}, { method: 'post' });
		}
		catch {
			return this.handleError("Server error creating user.");
		}
		try {		// USE TO SIGN IN
			const response = await axiosInstance.post('/token/obtain/', {
				username: this.state.username,
				password: this.state.password
			}, { method: 'post' });
			localStorage.setItem('access_token', response.data.access);
			localStorage.setItem('refresh_token', response.data.refresh);
			axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;

			window.location.replace('http://localhost:8000/Profile/');
		} catch (err) {
			if (err.response) {
				if (err.response.status >= 500) return this.handleError("Server error.");
			}
			else return this.handleError("Unexpected server error.")
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
						<InlineError error={this.state.error}>
							{this.state.error_msg}
						</InlineError>
						<Button type="submit" value="Register">
							<ButtonOverlay>
								<ButtonSmallPink hover={this.state.hover_register} onMouseEnter={this.togglehover_register} onMouseLeave={this.togglehover_register}
									style={{
										width: 92,
										height: 34,
										margin: 0,
										marginLeft: 104,
									}
									}
									caption="Register"
								></ButtonSmallPink>
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
