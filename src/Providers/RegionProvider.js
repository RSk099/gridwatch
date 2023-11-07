import React, { useState } from "react";
import RegionContext from "../Contexts/RegionContext";

const defaultState = {
  code: "",
  district: "",
  fetch: false,
  coords: {},
};

const RegionProvider = ({ children }) => {
  const [region, setRegion] = useState(defaultState);

  const resetRegion = () => {
    setRegion(defaultState);
  };

  const context = {
    region,
    setRegion,
    resetRegion,
  };

  return (
    <RegionContext.Provider value={context}>{children}</RegionContext.Provider>
  );
};

export default RegionProvider;
