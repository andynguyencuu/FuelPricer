import React, { Component } from "react";
import styled, { css } from "styled-components";

function BgGradientBottomRight(props) {
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
  flex: 1 1 0%;
  background-image: linear-gradient(135deg, rgba(242,213,153,1) 0%, #FFFFFF 56%, #EEEEEE 100%);
  display: flex;
  flex-direction: column;
`;

export default BgGradientBottomRight;
