import React, { useEffect } from "react";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import useRegion from "../hooks/useRegion";

import L from "leaflet";

import icon from "../icons/electricity.png";

const WindMap = () => {
  const { region } = useRegion();

  if (!region.coords.lat || !region.coords.lon) {
    return null;
  }

  return (
    <>
      <MapContainer
        center={[region.coords.lat, region.coords.lon]}
        zoom={18}
        scrollWheelZoom={false}
        style={{ height: "20rem" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <Marker
          position={[region.coords.lat, region.coords.lon]}
          icon={new L.icon({ iconUrl: icon, iconSize: new L.Point(35, 35) })}
        >
          <Popup>{region.code}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default WindMap;
