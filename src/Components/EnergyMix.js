import React from "react";

import DoublePie from "./DoublePie";

import Header from "./Header";
import GridBox from "./GridBox";

import fuels from "../utilities/fuelColours";

const EnergyMix = ({ mix }) => {
  const { generation, intensity } = mix;

  return (
    <GridBox style={{ width: "25rem" }}>
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
    </GridBox>
  );
};

export default EnergyMix;
