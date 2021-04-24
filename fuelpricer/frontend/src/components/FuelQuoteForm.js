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
import { DatePickerInput } from 'rc-datepicker';
import { FaCalendarDay } from "react-icons/fa";
import InlineError from "./InlineError"
import Transitioner from "./Transitioner";
import "../cal-style.css";

class FuelQuoteForm extends Component {
	constructor(props) {
		super(props);
		var today = new Date(),
			date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		this.state = { gallonsRequested: 0, dateOfQuote: date, dateRequested: "", address: "", address_2: "", pricePerGallon: 1.50, quotePrice: "0", error: false, error_msg: "", errorRHS: false, error_msgRHS: "", hover_generate: false, hover_accept: false, hover_return: false };
		// todo: copy this.state into ↓ when "Generate", use for "Accept"
		this.quote_buffer = {}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.generate = this.generate.bind(this);
		this.togglehover_generate = this.togglehover_generate.bind(this);
		this.togglehover_accept = this.togglehover_accept.bind(this);
		this.togglehover_return = this.togglehover_return.bind(this);

		this.current_gradient = `linear-gradient(90deg, #ddaf77 10%, #ffffff 100%)`;
		this.gradient_buffer = localStorage.getItem("grad_buffer");
		// "prevent" transition on direct url
		this.gradient_buffer = this.gradient_buffer ?? this.current_gradient;
		localStorage.setItem("grad_buffer", this.current_gradient);


	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleError(err) {
		this.setState({ ['error']: true, ['error_msg']: err });
		return setTimeout(function () { this.setState({ ['error']: false }) }.bind(this), 4000);
	}

	handleErrorRHS(err) {
		this.setState({ ['errorRHS']: true, ['error_msgRHS']: err });
		return setTimeout(function () { this.setState({ ['errorRHS']: false }) }.bind(this), 4000);
	}

	togglehover_generate() {
		this.setState({ ['hover_generate']: !this.state.hover_generate })
	}

	togglehover_accept() {
		this.setState({ ['hover_accept']: !this.state.hover_accept })
	}

	togglehover_return() {
		this.setState({ ['hover_return']: !this.state.hover_return })
	}

	async componentDidMount(event) {
		try {
			axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
			const response = await axiosInstance.get('/user/update/', { method: 'get' });
			let prefill = response.data;
			this.setState({ address: prefill.address + ' ' + prefill.city + ', ' + prefill.state + ' ' + prefill.zipcode });
		} catch (err) {
			return this.handleError("Server error fetching user details.");
		}
	}

	async generate(event) {
		event.preventDefault();
		try {
			if ([this.state.gallonsRequested, this.state.dateRequested].includes("")) {
				return this.handleError("Please provide required quote information!");
			}
			const data = await axiosInstance.patch('/quote/', {
				gallonsRequested: this.state.gallonsRequested,
				dateRequested: this.state.dateRequested,
				address: this.state.address
			}, { method: 'patch' });
			this.setState({ quotePrice: data.data.generated })
		} catch (err) {
			return this.handleError("Server error fetching quote.")
		}
	}

	async handleSubmit(event) {
		event.preventDefault();
		try {
			if (this.state.quotePrice == 0.00) {
				return this.handleErrorRHS("No quote generated yet!");
			}
			await axiosInstance.post('/quote/', {
				gallonsRequested: this.state.gallonsRequested,
				pricePerGallon: this.state.pricePerGallon,
				dateOfQuote: this.state.dateOfQuote,
				dateRequested: this.state.dateRequested,
				address: this.state.address,
				address_2: this.state.address_2,
				quotePrice: this.state.quotePrice
			}, { method: 'post' });
			this.setState({ ['errorRHS']: true, ['error_msgRHS']: '✅' })
			setTimeout(() => {
				window.location.replace('http://localhost:8000/Dashboard/');
			}, 1000);
			return;
		} catch (err) {
			return this.handleErrorRHS("Server error accepting quote.")
		}
	}


	render() {
		return (
			<Container>
				<Transitioner in={this.current_gradient} out={this.gradient_buffer}></Transitioner>
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
						<CalInput
							style={{
								width: 300,
								height: 35,
								marginLeft: 20,
								marginRight: 20,

							}}
						>
							<FaCalendarDay
								style={{
									color: "#616161",
									fontSize: 20,
									paddingLeft: 10,
									marginRight: 8
								}}
							/>
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
									marginTop: 10,
									marginBottom: 10,
									marginRight: 20,
									marginLeft: -11,
								}}
							/>
						</CalInput>

						<PrefilledPricePerGallon
							name="pricepergallon" type="text" value={parseFloat(this.state.pricePerGallon.toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
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
						<InlineError error={this.state.error}>
							{this.state.error_msg}
						</InlineError>
						<Generate>
							<ButtonOverlay
								type="submit" value="Generate">
								<ButtonSmallBlue hover={this.state.hover_generate} onMouseEnter={this.togglehover_generate} onMouseLeave={this.togglehover_generate}
									style={{
										width: 100,
										height: 34,
										marginBottom: 20
									}}
									caption="Generate"
								></ButtonSmallBlue>
							</ButtonOverlay>
						</Generate>
					</form>
				</QuoteForm>
				<Group1>
					<Logo src={"https://i.ibb.co/bFRMRGm/fuel23.png"}></Logo>
					<Link to="/Dashboard">
						<ButtonOverlay>
							<ButtonFancy hover={this.state.hover_return} onMouseEnter={this.togglehover_return} onMouseLeave={this.togglehover_return}
								button="Button"
								style={{
									height: 34,
									width: 80,
									borderRadius: 100,
									marginBottom: 0
								}}
								button="Return"
							></ButtonFancy>
						</ButtonOverlay>
					</Link>
				</Group1>
				<QuoteOutput>
					<form onSubmit={this.handleSubmit}>
						<BoxHeader1>
							<YourFuelQuote>YOUR FUEL QUOTE</YourFuelQuote>
						</BoxHeader1>
						<PrefilledTotalAmountDue
							name="totalamountdue" type="text" value={parseFloat(this.state.quotePrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
							style={{
								width: 300,
								height: 65,
								marginLeft: 20
							}}
						></PrefilledTotalAmountDue>
						<InlineError error={this.state.errorRHS}>
							{this.state.error_msgRHS}
						</InlineError>
						<Accept>
							<ButtonOverlay
								type="submit" value="Accept">
								<ButtonSmallGreen hover={this.state.hover_accept} onMouseEnter={this.togglehover_accept} onMouseLeave={this.togglehover_accept}
									style={{
										width: 80,
										height: 34,
										marginTop: 20,
										marginBottom: 20,
										marginRight: 20
									}}
									caption="Accept"
								></ButtonSmallGreen>
							</ButtonOverlay>
						</Accept>
					</form>
				</QuoteOutput>
			</Container>
		);
	}
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
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

const QuoteForm = styled.div`
	background-color: rgba(255, 255, 255, 1);
	border-radius: 30px;
	flex-direction: column;
	align-items: center;
	width: 340px;
	display: flex;
	box-shadow: 3px 3px 10px 0.5px rgba(0, 0, 0, 1);
`;

const CalInput = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: rgba(230,230,230,1);

	border-radius: 10px;

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

const Logo = styled.img`
	width: 174px;
	height: 100%;
	margin-bottom: 500px;
	object-fit: contain;
`;

const Generate = styled.div`
  display: flex;
  justify-content: 'center';
  flex-direction: column;
  height: 44px;
  padding: 0px;
  margin-bottom: 15px;
  align-self: stretch;
  align-items: center;
`;

const Accept = styled.div`
  display: flex;
  justify-content: 'center';
  flex-direction: column;
  height: 44px;
  padding: 0px;
  margin-bottom: 15px;
  align-self: stretch;
  align-items: center;
`;

const QuoteOutput = styled.div`
	background-color: rgba(255, 255, 255, 1);
	border-radius: 30px;
	flex-direction: column;
	align-items: center;
	height: 155px;
	width: 320px;
	display: flex;
	box-shadow: 3px 3px 10px 0.5px rgba(0, 0, 0, 1);
`;

const BoxHeader1 = styled.div`
	height: 60px;
	background-color: rgba(98, 185, 87, 1);
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
	width: 320px;
	margin-bottom: 10px;
	flex-direction: column;
	display: flex;
`;

const YourFuelQuote = styled.span`
	font-family: Lato;
	font-style: normal;
	font-weight: 900;
	color: rgba(255, 255, 255, 1);
	width: 320px;
	height: 24px;
	text-align: center;
	font-size: 20px;
	margin-top: 18px;
`;

export default FuelQuoteForm;
