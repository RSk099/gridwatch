import React, { useState, useEffect } from "react";
import { useQueries } from "react-query";
import dayjs from "dayjs";
import GridBox from "./GridBox";
import Header from "./Header";
import LineChart from "./LineChart";

const today = dayjs().format("YYYY-MM-DD");
const convertToInterval = (timestamp) => {
  const hours = timestamp.hour();
  const minutes = timestamp.minute();
  const interval = hours * 2 + (minutes === 30 ? 2 : 1);
  return interval;
};

const Demand = () => {
  const [demand, setDemand] = useState();
  const to = convertToInterval(dayjs());
  const from = convertToInterval(dayjs().subtract(12, "hour"));

  const queries = useQueries([
    {
      id: "actual-demand",
      queryKey: `https://data.elexon.co.uk/bmrs/api/v1/demand/total/actual?from=${today}&to=${today}&settlementPeriodFrom=${from}&settlementPeriodTo=${to}&format=json`,
    },
    {
      id: "day-ahead-demand",
      queryKey: `https://data.elexon.co.uk/bmrs/api/v1/forecast/demand/total/day-ahead?from=${today}&to=${today}&settlementPeriodFrom=${from}&settlementPeriodTo=${to}&format=json`,
    },
  ]);

  useEffect(() => {
    if (!queries.some((query) => query.isLoading) && !demand) {
      const actual = queries[0].data.data;
      const forecast = queries[1].data.data;

      const combinedData = [...actual, ...forecast].reduce((acc, entry) => {
        const { settlementPeriod, quantity } = entry;
        const existingEntry = acc.find(
          (item) => item.settlementPeriod === settlementPeriod
        );

        if (existingEntry) {
          existingEntry[actual.includes(entry) ? "actual" : "forecast"] =
            quantity;
        } else {
          acc.push({
            settlementPeriod,
            actual: actual.includes(entry) ? quantity : null,
            forecast: forecast.includes(entry) ? quantity : null,
          });
        }

        return acc;
      }, []);

      const sortedData = combinedData.sort(
        (a, b) => a.settlementPeriod - b.settlementPeriod
      );
      setDemand(sortedData);
    }
  }, [queries, demand]);

  const isLoading = queries.some((query) => query.isLoading);

  if (isLoading || !demand) {
    return null;
  }

  return (
    <GridBox>
      <div style={{ width: "100%" }}>
        <Header>Demand</Header>
        <div style={{ width: "100%", textAlign: "right" }}>
          <select value="one">
            <option value="default">Time period</option>
            <option value="one">1 hour</option>
            <option value="three">3 hours</option>
            <option value="twentyfour">24 hours</option>
          </select>
        </div>
        <LineChart data={demand} style={{ width: "100%" }} />
      </div>
    </GridBox>
  );
};

export default Demand;
