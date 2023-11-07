import React from "react";

import { styled as styledComponent } from "styled-components";

import Emissions from "./Emissions";
import EnergyTypes from "./EnergyTypes";
import EnergyMix from "./EnergyMix";

const FlexGrid = styledComponent.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Generation = ({ mix }) => {
  return (
    <FlexGrid>
      <EnergyMix mix={mix} />
      <EnergyTypes mix={mix} />
      <Emissions mix={mix} />
    </FlexGrid>
  );
};

export default Generation;
