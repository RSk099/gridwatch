import React, { useState, useEffect } from "react";
import { useQueries } from "react-query";

const colors = {
  high: { background: "#FF4136", text: "#FFD700" },
  moderate: { background: "#FFD700", text: "#000000" },
  low: { background: "#3D9970", text: "#FFFFFF" },
};

const statsFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

const statsTo = new Date().toISOString();

const RegionalCarbonIntensity = ({ data }) => {
  const compareForecast = () => {
    if (!data.actual) {
      return `There's currently no reported value, but the forecast was: ${data.forecast} g.`;
    }

    if (data.actual > data.forecast) {
      return `It's higher than the forecast ${data.forecast} g.`;
    }

    if (data.actual < data.forecast) {
      return `It's lower than the forecast ${data.forecast} g.`;
    }

    if (data.actual == data.forecast) {
      return `It's the same as the forecast ${data.forecast} g.`;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        padding: "2rem",
        textAlign: "center",
        flexDirection: "row",
      }}
    >
      <div>
        <div
          style={{
            margin: "auto",
            display: "flex",
            height: "65px",
            width: "65px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1rem",
            backgroundColor: colors[data.index]?.background,
          }}
        >
          <span style={{ color: colors[data.index]?.text }}>
            {data.actual ? `${data.actual} g` : `???`}
          </span>
        </div>
        {/* <div style={{ fontSize: "12px" }}> Carbon intensity </div> */}
        {/* <div style={{ fontSize: "10px" }}>gCO₂eq/kWh</div> */}
      </div>
      <div style={{ margin: "auto", marginTop: "0" }}>
        <div
          style={{
            width: "100%",
            margin: "auto",
            fontSize: "12px",
          }}
        >
          <span>The current carbon intensity is </span>
          <span style={{ fontWeight: "bold" }}>{data.index}</span>.
        </div>
        <div
          style={{
            width: "100%",
            margin: "auto",
            fontSize: "12px",
          }}
        >
          <span> {compareForecast()}</span>
        </div>

        <div
          style={{
            width: "100%",
            margin: "auto",
            fontSize: "12px",
          }}
        >
          {/* <span>The average intensity is </span> */}
          {/* <span style={{ fontWeight: "bold" }}> */}
          {/* {data.statistics.average} g. */}
          {/* </span> */}
        </div>
      </div>
    </div>
  );
};

export default RegionalCarbonIntensity;
