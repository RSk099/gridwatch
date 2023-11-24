import { Card } from "@mui/material";
import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const Container = styled(Card)`
  height: 5rem;
  display: flex;
  justify-content: space-evenly;
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px solid #00000026;
  border-radius: 0;
  box-shadow: unset;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background-color: #00000026;
`;

const StyledBox = styled.div`
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-child(2) {
    margin: 0 1rem;
  }
`;

const Title = styled.div`
  margin: auto;
  font-weight: 700;
  font-size: 20px;
`;

const Subtitle = styled.div`
  margin: auto;
  font-size: 20px;
`;

const Box = ({ title, subtitle }) => (
  <StyledBox>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </StyledBox>
);

const StatusBar = ({ time, contextual }) => {
  return (
    <Container>
      <Box title="Last Updated:" subtitle={`${dayjs(time).format("HH:mm")}`} />
      <Divider />
      <Box title="Emissions:" subtitle="109g/kWh" />
      <Divider />
      <Box title={contextual.title} subtitle={contextual.subtitle} />
    </Container>
  );
};

export default StatusBar;
