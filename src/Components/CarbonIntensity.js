import React, { useState, useEffect } from "react";
import { useQueries } from "react-query";

const colors = {
  high: { background: "#FF4136", text: "#FFD700" },
  moderate: { background: "#FFD700", text: "#000000" },
  low: { background: "#3D9970", text: "#FFFFFF" },
};

const statsFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

const statsTo = new Date().toISOString();

const CarbonIntensity = ({ regionalIntensity }) => {
  const [intensity, setIntensity] = useState({
    actual: null,
    forecast: null,
    index: null,
    statistics: {},
  });

  const results = useQueries([
    { queryKey: "https://api.carbonintensity.org.uk/intensity" },
    {
      queryKey: `https://api.carbonintensity.org.uk/intensity/stats/${statsFrom}/${statsTo}`,
    },
  ]);

  const isLoading = results.some((query) => query.isLoading);
  const allSuccess = results.every((num) => num.isSuccess === true);

  useEffect(() => {
    if (allSuccess) {
      const [current, statistics] = results;

      setIntensity({
        ...current.data.data[0].intensity,
        statistics: statistics.data.data[0].intensity,
      });
    }
  }, [allSuccess]);

  if (isLoading) {
    return null;
  }

  const compareForecast = () => {
    if (!intensity.actual) {
      return `There's currently no reported value, but the forecast was: ${intensity.forecast} g.`;
    }

    if (intensity.actual > intensity.forecast) {
      return `It's higher than the forecast ${intensity.forecast} g.`;
    }

    if (intensity.actual < intensity.forecast) {
      return `It's lower than the forecast ${intensity.forecast} g.`;
    }

    if (intensity.actual == intensity.forecast) {
      return `It's the same as the forecast ${intensity.forecast} g.`;
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
            backgroundColor: colors[intensity.index]?.background,
          }}
        >
          <span style={{ color: colors[intensity.index]?.text }}>
            {intensity.actual ? `${intensity.actual} g` : `???`}
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
          <span style={{ fontWeight: "bold" }}>{intensity.index}</span>.
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
          <span>The average intensity is </span>
          <span style={{ fontWeight: "bold" }}>
            {intensity.statistics.average} g.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarbonIntensity;
