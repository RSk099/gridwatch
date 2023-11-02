import React, { useState } from "react";
import { useQuery } from "react-query";

import { Card } from "@mui/material";
import { styled as styledComponent } from "styled-components";

import Loading from "./Loading";
import PageWrapper from "./PageWrapper";
import PieChart from "./PieChart";
import Donut from "./Donut";
import CarbonIntensity from "./CarbonIntensity";

const EnergyType = styledComponent(Card)`
  margin-bottom: 1rem;
  width: 25rem;
`;

const Header = styledComponent.div`
  padding: 1rem;
  background-color: ${(props) => props.color};
  font-weight: bold;
  text-transform: capitalize;
`;

Header.defaultProps = {
  color: "#B3B3B3",
};

const Value = styledComponent.div`
  padding: 0.5rem;
`;

const FlexGrid = styledComponent.div`
  display: flex;
  flex-wrap: wrap;
`;

const fuels = {
  "fossil fuels": "#FF6B6B",
  renewables: "#7BC74D",
  other: "#B3B3B3",
  imported: "#008080",
};

const GenerationDetailed = () => {
  const [mix, setMix] = useState();
  const { data, isLoading } = useQuery("grid", {
    onSuccess: (data) => {
      setMix(data.mix);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const percentage = (value) => {
    return ((value / mix.total) * 100).toFixed(1);
  };

  return (
    <FlexGrid>
      <EnergyType>
        <Header>Generation</Header>
        <Donut
          data={Object.entries(data.sources).map(([category, values]) => ({
            name: category,
            value: values.total,
            color: fuels[category],
          }))}
        />
        <CarbonIntensity />
      </EnergyType>

      <div style={{ paddingLeft: "1rem" }}>
        {Object.entries(data.sources).map(([category, values]) => (
          <EnergyType variant="outlined" key={category}>
            <Header color={fuels[category]}>
              {percentage(values.total)}%{` `}
              {category}
            </Header>
            <div>
              {Object.keys(values).map(
                (type) =>
                  type !== "total" && (
                    <Value key={category + type}>
                      {type}: {values[type]} GW
                    </Value>
                  )
              )}
            </div>
          </EnergyType>
        ))}
      </div>
    </FlexGrid>
  );
};

export default GenerationDetailed;
