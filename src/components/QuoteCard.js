import React, { Component } from "react";
import styled, { css } from "styled-components";
import FontAwesomeIcon from "react-native-vector-icons/dist/FontAwesome";

function QuoteCard(props) {
  return (
    <Container {...props}>
      <QuoteHeader>
        <QuotePriceStack>
          <QuotePrice>{props.quotePrice || "$Quote Price"}</QuotePrice>
          <QuoteCreated>
            {props.quoteCreated || "Created #/#/####"}
          </QuoteCreated>
        </QuotePriceStack>
      </QuoteHeader>
      <QuoteDetails>
        <Icons>
          <FontAwesomeIcon
            name="tint"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 25
            }}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            name="dollar"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 22
            }}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            name="clock-o"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 22
            }}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            name="map-marker"
            style={{
              color: "rgba(128,128,128,1)",
              fontSize: 22
            }}
          ></FontAwesomeIcon>
        </Icons>
        <Datae>
          <GallonsRequested>
            {props.gallonsRequested || "Gallons Requested"}
          </GallonsRequested>
          <PriceGallon>{props.priceGallon || "Price/Gallon"}</PriceGallon>
          <DeliveryDate>{props.deliveryDate || "Delivery Date"}</DeliveryDate>
          <DeliveryAddress>
            {props.deliveryAddress || "Delivery Address"}
          </DeliveryAddress>
        </Datae>
      </QuoteDetails>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  flex-direction: column;
  box-shadow: 3px 3px 10px 0.5px rgba(0, 0, 0, 1);
`;

const QuoteHeader = styled.div`
  height: 80px;
  background-color: rgba(230, 230, 230, 1);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  width: 400px;
  flex-direction: column;
  display: flex;
`;

const QuotePrice = styled.span`
  font-family: Lato;
  font-size: 50px;
  color: rgba(28, 80, 28, 1);
  font-weight: 900;
  text-align: center;
  position: absolute;
  height: 59px;
  width: 400px;
  top: 0px;
  left: 0px;
`;

const QuoteCreated = styled.span`
  font-family: Lato;
  font-size: 14px;
  color: rgba(90, 90, 90, 1);
  font-weight: 700;
  text-align: center;
  position: absolute;
  top: 54px;
  left: 0px;
  right: 0px;
`;

const QuotePriceStack = styled.div`
  height: 71px;
  margin-top: 6px;
  position: relative;
`;

const QuoteDetails = styled.div`
  height: 134px;
  flex-direction: row;
  width: 400px;
  display: flex;
`;

const Icons = styled.div`
  width: 19px;
  height: 110px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 5px;
  display: flex;
`;

const Datae = styled.div`
  width: 350px;
  height: 110px;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 10px;
  display: flex;
`;

const GallonsRequested = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  color: rgba(74, 74, 74, 1);
  height: 20px;
  width: 350px;
  font-size: 18px;
`;

const PriceGallon = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  color: rgba(74, 74, 74, 1);
  height: 20px;
  width: 350px;
  font-size: 18px;
`;

const DeliveryDate = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  height: 20px;
  width: 350px;
  font-size: 18px;
`;

const DeliveryAddress = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 400;
  color: rgba(74, 74, 74, 1);
  height: 20px;
  width: 350px;
  font-size: 18px;
`;

export default QuoteCard;
