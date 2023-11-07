import React from "react";
import {
  CartesianGrid,
  LineChart as Chart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const LineChart = ({ data }) => {
  const generateY = (value) => value / 1000;

  const generateX = ({ settlementPeriod }) => {
    const hours = Math.floor((settlementPeriod - 1) / 2);
    const minutes = settlementPeriod % 2 === 1 ? "00" : "30";
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  const getLastActual = () => {
    const lastKnown = data.filter((entry) => entry.actual !== null);
    return generateX(lastKnown[lastKnown.length - 1]);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "300px",
        marginTop: "1rem",
      }}
    >
      <div
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
      >
        <ResponsiveContainer>
          <Chart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={generateX} allowDuplicatedCategory={false} />
            <YAxis
              unit=" GW"
              allowDataOverflow={true}
              padding={{ top: 15, bottom: 0 }}
              tickFormatter={generateY}
            />
            <Legend />

            <Line
              type="monotone"
              dataKey="forecast"
              unit="GW"
              name="Forecasted Usage (Gigawatts)"
              stroke="#B3B3B3"
            />
            <ReferenceLine
              isFront
              x={getLastActual()}
              stroke="orange"
              strokeDasharray="3 3"
              label={({ viewBox: { x, y } }) => (
                <g
                  transform={`translate(${x - 10} ${y - 25})`}
                  style={{ cursor: "pointer" }}
                >
                  Last known value
                </g>
              )}
            />
            <Line
              type="monotone"
              dataKey="actual"
              unit="GW"
              name="Actual Power Usage (Gigawatts)"
              stroke="#82ca9d"
            />
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
