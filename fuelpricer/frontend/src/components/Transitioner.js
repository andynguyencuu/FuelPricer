import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";

function Transitioner(props) {
  return (
    <Container {...props}>
      <OutGrad
      style={{
        backgroundImage: props.out
      }}
      ></OutGrad>
      <InGrad
      style={{
        backgroundImage: props.in
      }}
      ></InGrad>
    </Container>
  );
}

const fadeIn = keyframes`
  from { opacity: 0;}
  to { opacity: 1; }
`;

const OutGrad = styled.div`
  z-index: -2;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: 100%;
  height: 100vh;
  width: 100vw;
  `
const InGrad = styled.div`
  z-index: -1;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  animation: ${fadeIn} 3s cubic-bezier(.39,.45,.2,.97);
  background-size: 100%;
  height: 100vh;
  width: 100vw;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  `;


export default Transitioner;
