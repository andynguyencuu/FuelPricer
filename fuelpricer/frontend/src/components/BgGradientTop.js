import React, { Component } from "react";
import styled, { css } from "styled-components";

function BgGradientTop(props) {
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
  height: 768px;
  width: 1366px;
  background-image: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,213,153,1) 89%);
  display: flex;
  flex-direction: column;
`;

export default BgGradientTop;
