import React, { useState } from "react";
import RegionContext from "../Contexts/RegionContext";

const RegionProvider = ({ children }) => {
  const [postcode, setPostcode] = useState();

  const context = {
    postcode,
    setPostcode,
  };

  return (
    <RegionContext.Provider value={context}>{children}</RegionContext.Provider>
  );
};

export default RegionProvider;
