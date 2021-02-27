import React, { Component } from "react";
import styled, { css } from "styled-components";

function BgGradientBottom(props) {
  return (
    <Container {...props}>
      <Rect></Rect>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rect = styled.div`
  height: 768px;
  background-image: linear-gradient(180deg, rgba(242,213,153,1) 17%, #EEEEEE 100%);
`;

export default BgGradientBottom;
