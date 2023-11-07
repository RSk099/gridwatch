import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import useRegion from "../hooks/useRegion";

const PostcodeInput = () => {
  const { region, setRegion, resetRegion } = useRegion();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;

    setRegion({ ...region, code: value });
  };

  const { isLoading } = useQuery(
    `http://api.getthedata.com/postcode/${region.code}`,
    {
      enabled: Boolean(region.fetch),
      onSuccess: (data) => {
        if (data.status === "match") {
          setRegion({
            fetch: false,
            code: data.input,
            district: data.data.postcode_district,
            coords: { lat: data.data.latitude, lon: data.data.longitude },
          });
          navigate(`/regional/${data.data.postcode_district}`);
        } else {
          console.log("postcode not found");
          setRegion({ ...region, fetch: false });
        }
      },
    }
  );

  const handleSubmit = () => {
    if (region.code) {
      setRegion({ ...region, fetch: true });
    }
  };

  return (
    <>
      <input
        placeholder="Postcode"
        value={region.code}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>
        {isLoading ? "Loading..." : "Find"}
      </button>
      {region && (
        <button
          onClick={() => {
            resetRegion();
            navigate(`/`);
          }}
        >
          Clear
        </button>
      )}
    </>
  );
};

export default PostcodeInput;
