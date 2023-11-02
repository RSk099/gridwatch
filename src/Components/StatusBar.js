import { Card } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";

import { styled as styledComponent } from "styled-components";

const Container = styledComponent(Card)`
display: flex;
justify-content: space-evenly;
margin-bottom: 1rem;
padding: 0.5rem;
`;

const StyledBox = ({ title, subtitle }) => (
  <div style={{ margin: "auto" }}>
    <div style={{ margin: "auto", fontWeight: "bold" }}>{title}</div>
    <div style={{ margin: "auto" }}>{subtitle}</div>
  </div>
);
const Box = styledComponent(StyledBox)`
padding: 1rem;
`;

const StatusBar = ({ contextual }) => {
  return (
    <Container>
      <Box title="Time:" subtitle="12:30 pm" />
      <Box title="Emissions:" subtitle="109g/kWh" />
      <Box title={contextual.title} subtitle={contextual.subtitle} />
    </Container>
  );
};

export default StatusBar;
