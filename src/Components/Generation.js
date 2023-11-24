import React from "react";

import { styled as styledComponent } from "styled-components";

import Emissions from "./Emissions";
import EnergyTypes from "./EnergyTypes";
import EnergyMix from "./EnergyMix";

import FlexGrid from "./FlexGrid";

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
