import React, { useState } from "react";
import { useQuery } from "react-query";

import CarbonIntensity from "./CarbonIntensity";
import RegionalCarbonIntensity from "./RegionalCarbonIntensity";

import Header from "./Header";
import GridBox from "./GridBox";
import DoublePie from "./DoublePie";

import fuels from "../utilities/fuelColours";
import { Fade } from "@mui/material";

function createFuelArray(fuelData, categoryData) {
  // Mapping between fuel names in fuelData and categoryData
  const fuelNameMapping = {
    Biomass: "biomass",
    Coal: "coal",
    "Dutch Imports": "imports",
    "French Imports": "imports",
    "Gas (Combined Cycle)": "gas",
    "Gas (Open Cycle)": "gas",
    Hydro: "hydro",
    "Irish Imports": "imports",
    Nuclear: "nuclear",
    Oil: "oil",
    Other: "other",
    "Pumped Storage": "pumped storage",
    Solar: "solar",
    Wind: "wind",
  };

  return Object.keys(fuelData)
    .filter((fuelName) => fuelData.hasOwnProperty(fuelName))
    .map((fuelName) => {
      const mappedFuelName = fuelNameMapping[fuelName];
      const categoryItem = categoryData.find((c) => c.fuel === mappedFuelName);

      if (categoryItem) {
        return {
          fuel: mappedFuelName,
          intensity: (fuelData[fuelName] * categoryItem.perc).toFixed(2),
        };
      }

      return null;
    })
    .filter((item) => item !== null && item.intensity !== "0.00")
    .sort((a, b) => b.intensity - a.intensity);
}

const Emissions = ({ mix }) => {
  const [fuel, setFuel] = useState();
  const { generation, intensity } = mix;

  const { isLoading } = useQuery(
    "https://api.carbonintensity.org.uk/intensity/factors",
    {
      onSuccess: (data) => {
        setFuel(createFuelArray(data.data[0], generation));
      },
    }
  );

  return (
    <Fade in={Boolean(!isLoading)}>
      <GridBox style={{ width: "25rem" }}>
        <Header>Emissions</Header>
        {!intensity && <CarbonIntensity />}
        {intensity && <RegionalCarbonIntensity data={intensity} />}

        {/* <DoublePie
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
      /> */}
      </GridBox>
    </Fade>
  );
};

export default Emissions;
