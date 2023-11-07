import React from "react";
import { styled as styledComponent } from "styled-components";

import renewable from "../icons/renewable.png";
import fossil from "../icons/fossil.png";
import imported from "../icons/import.png";
import other from "../icons/other.png";

import categories from "../utilities/categories";

import Header from "./Header";
import GridBox from "./GridBox";

import fuels from "../utilities/fuelColours";
import { Fade } from "@mui/material";

const Icon = styledComponent.img`
  width: 35px;
  left: 0;
`;

const Value = styledComponent.div`
  padding: 0.5rem;
  font-weight: 500;
`;

const fuelIcons = {
  "fossil fuels": fossil,
  renewables: renewable,
  other,
  imported,
};

const EnergyTypes = ({ mix }) => {
  const { generation } = mix;

  return (
    <Fade in>
      <div style={{ width: "25rem" }}>
        {Object.keys(categories).map((category) => (
          <GridBox variant="outlined" key={category}>
            <Header color={fuels[category]}>
              <span style={{ marginTop: "auto", marginBottom: "auto" }}>
                {category}
              </span>

              <Icon src={fuelIcons[category]} />
            </Header>
            <div>
              {generation.map(
                ({ fuel, perc, category: fuelType }) =>
                  fuelType == category && (
                    <Value key={fuel}>
                      {fuel.charAt(0).toUpperCase() + fuel.slice(1)}: {perc} %
                    </Value>
                  )
              )}
            </div>
          </GridBox>
        ))}
      </div>
    </Fade>
  );
};

export default EnergyTypes;
