import React, { useContext } from "react";
import RegionContext from "../Contexts/RegionContext";

const useRegion = () => {
  const context = useContext(RegionContext);

  return context;
};

export default useRegion;
