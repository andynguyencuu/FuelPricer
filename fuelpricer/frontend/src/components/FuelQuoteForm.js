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
		this.state = { gallonsRequested: 0, dateOfQuote: date, dateRequested: "", address: "", address_2: "", pricePerGallon: 1.50, quotePrice: "0", baseMargin: 0.00, error: false, error_msg: "", errorRHS: false, error_msgRHS: "", hover_generate: false, hover_accept: false, hover_return: false };
		// todo: copy this.state into ↓ when "Generate", use for "Accept"
		this.quote_buffer = {}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.generate = this.generate.bind(this);
		this.enterhover_generate = this.enterhover_generate.bind(this);
		this.enterhover_accept = this.enterhover_accept.bind(this);
		this.enterhover_return = this.enterhover_return.bind(this);
		this.exithover_generate = this.exithover_generate.bind(this);
		this.exithover_accept = this.exithover_accept.bind(this);
		this.exithover_return = this.exithover_return.bind(this);

		this.current_gradient = `linear-gradient(90deg, #ddaf77 10%, #ffffff 100%)`;
		this.gradient_buffer = localStorage.getItem("grad_buffer");
		// "prevent" transition on direct url
		this.gradient_buffer = this.gradient_buffer ?? this.current_gradient;
		localStorage.setItem("grad_buffer", this.current_gradient);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
		if (event.target.name == 'gallonsRequested') { 
			this.setState({ pricePerGallon: parseFloat((1.50 * this.state.baseMargin - ((event.target.value > 1000) ? 0.01 : 0.00)).toFixed(2)) });
			if (event.target.value < 0) event.target.value = 0;
		 }
	}

	handleError(err) {
		this.setState({ ['error']: true, ['error_msg']: err });
		return setTimeout(function () { this.setState({ ['error']: false }) }.bind(this), 4000);
	}

	handleErrorRHS(err) {
		this.setState({ ['errorRHS']: true, ['error_msgRHS']: err });
		return setTimeout(function () { this.setState({ ['errorRHS']: false }) }.bind(this), 4000);
	}

	enterhover_generate() { this.setState({ ['hover_generate']: true })	}
	enterhover_accept() { this.setState({ ['hover_accept']: true })	}
	enterhover_return() { this.setState({ ['hover_return']: true })	}
	exithover_generate() { this.setState({ ['hover_generate']: false })	}
	exithover_accept() { this.setState({ ['hover_accept']: false })	}
	exithover_return() { this.setState({ ['hover_return']: false })	}

	async componentDidMount(event) {
		try {
			axiosInstance.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
			const response = await axiosInstance.get('/user/update/', { method: 'get' });
			let prefill = response.data;
			this.setState({ address: prefill.address + ' ' + prefill.city + ', ' + prefill.state + ' ' + prefill.zipcode });

			// fetch past customer status
			const quer = await axiosInstance.get('/quote/', { method: 'get' });
			
			let quote_exists = (quer.data.length > 0);
			// > 1000 default false 0.03
			this.setState({ baseMargin: parseFloat((prefill.state == 'TX' ? 1.02 : 1.04) - (quote_exists ? 0.01 : 0.00) + 0.03 + 0.1).toFixed(2)});
			this.setState({ pricePerGallon: parseFloat((this.state.pricePerGallon * this.state.baseMargin).toFixed(2))});
		} catch (err) {
			return this.handleError("Server error fetching user details.");
		}
	}

	async generate(event) {
		event.preventDefault();
		try {
			if (this.state.gallonsRequested== 0) { return this.handleError("Please provide a request amount."); }
			if (this.state.dateRequested == "") { return this.handleError("Please provide a delivery date."); }
			if (this.state.dateRequested == "Invalid date") {
				return this.handleError("Invalid date. Please use the calendar!");
			}
			let today = new Date();
			if (this.state.dateRequested.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime()) {
				return this.handleError("Tomorrow is the earliest possible delivery.")
			}
			const data = await axiosInstance.patch('/quote/', {
				gallonsRequested: this.state.gallonsRequested,
				dateRequested: this.state.dateRequested,
				address: this.state.address
			}, { method: 'patch' });
			this.setState({ quotePrice: parseFloat(data.data.generated.toFixed(2)) })
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
								minDate={new Date().toISOString().slice(0, 10)}
								className='deliveryDate'
								valueLink={{
									value: this.state.dateRequested,
									requestChange: dateRequested => this.setState( {dateRequested} )
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
								<ButtonSmallBlue hover={this.state.hover_generate} onMouseEnter={this.enterhover_generate} onMouseLeave={this.exithover_generate}
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
					<Link to="/Dashboard" style={{ textDecoration: 'none' }}>
						<ButtonOverlay>
							<ButtonFancy hover={this.state.hover_return} onMouseEnter={this.enterhover_return} onMouseLeave={this.exithover_return}
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
								<ButtonSmallGreen hover={this.state.hover_accept} onMouseEnter={this.enterhover_accept} onMouseLeave={this.exithover_accept}
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
				<Container></Container>
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
