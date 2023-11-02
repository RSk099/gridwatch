import React from "react";

import { Card } from "@mui/material";
import { styled as styledComponent } from "styled-components";

import CarbonIntensity from "./CarbonIntensity";
import DoublePie from "./DoublePie";

import renewable from "../icons/renewable.png";
import fossil from "../icons/fossil.png";
import imported from "../icons/import.png";
import other from "../icons/other.png";

import categories from "../utilities/categories";
import RegionalCarbonIntensity from "./RegionalCarbonIntensity";

const EnergyType = styledComponent(Card)`
  margin-bottom: 1rem;
  // width: 25rem;
`;

const Header = styledComponent.div`
display: flex;
justify-content: space-between;  
padding: 1rem;
  background-color: ${(props) => props.color};
  font-weight: bold;
  text-transform: capitalize;
  `;

const Icon = styledComponent.img`
  width: 35px;
  left: 0;
`;

Header.defaultProps = {
  color: "#B3B3B3",
};

const Value = styledComponent.div`
  padding: 0.5rem;
  font-weight: 500;
`;

const FlexGrid = styledComponent.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const fuels = {
  "fossil fuels": "#FF6B6B",
  renewables: "#7BC74D",
  other: "#B3B3B3",
  imported: "#008080",
};

const fuelIcons = {
  "fossil fuels": fossil,
  renewables: renewable,
  other,
  imported,
};

const Generation = ({ mix }) => {
  const { generation, intensity } = mix;

  return (
    <FlexGrid>
      <EnergyType style={{ width: "25rem" }}>
        <Header>Energy mix</Header>
        <p
          style={{
            fontSize: "12px",
            margin: "auto",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "1rem",
          }}
        >
          An Energy Mix refers to the blend of energy sources (fossil fuels,
          renewables, etc.) the country uses to meet it's power and heat
          requirements.
        </p>
        {/* <Donut
          data={mix.map(({ fuel, perc, category }) => ({
            name: fuel,
            value: perc,
            color: fuels[category],
          }))}
        /> */}

        <DoublePie
          innerData={Object.entries(
            generation.reduce((acc, fuel) => {
              const category = fuel.category;
              acc[category] = (acc[category] || 0) + fuel.perc;
              return acc;
            }, {})
          )
            .map(([name, value]) => ({
              name,
              value,
              color: fuels[name],
            }))
            .sort((a, b) => a.name.localeCompare(b.name))}
          outerData={generation
            .map(({ fuel, perc, category }) => ({
              name: fuel,
              value: perc,
              color: fuels[category],
              category,
            }))
            .sort((a, b) => a.category.localeCompare(b.category))}
        />
      </EnergyType>
      <div style={{ width: "25rem" }}>
        {Object.keys(categories).map((category) => (
          <EnergyType variant="outlined" key={category}>
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
          </EnergyType>
        ))}
      </div>
      <EnergyType style={{ width: "25rem" }}>
        <Header>Emissions</Header>
        {!intensity && <CarbonIntensity />}
        {intensity && <RegionalCarbonIntensity data={intensity} />}
        {/* <Donut
          data={mix.map(({ fuel, perc, category }) => ({
            name: fuel,
            value: perc,
            color: fuels[category],
          }))}
        /> */}
      </EnergyType>
    </FlexGrid>
  );
};

export default Generation;
