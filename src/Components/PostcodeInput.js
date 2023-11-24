import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import useRegion from "../hooks/useRegion";
import styled from "styled-components";

import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Input = styled.input`
  ${({ invalid }) => (invalid ? `border: 1px solid #ff4e4e;` : `border: none;`)}
  padding: 0.5rem;
  background-color: #efefef;
  padding-left: 35px; /* Adjust the padding to leave space for the logo */
  width: 200px; /* Set the desired width for the input */
  height: 35px; /* Set the desired height for the input */
  outline: none;
  font-size: 16px;

  ::placeholder {
    color: #aaa;
  }
`;

const Logo = styled(SearchIcon)`
  ${({ invalid }) => (invalid ? `fill: #ff4e4e;` : `fill: #aaa;`)}
  position: absolute;
  left: 10px; /* Adjust the left position to position the logo */
  top: 50%;
  transform: translateY(-50%);
  width: 20px; /* Set the desired width for the logo */
  height: auto;
  cursor: pointer;
`;

const HiddenLabel = styled.label`
  display: block;
  height: 0;
  overflow: hidden;
`;

const ClearInput = styled(HighlightOffIcon)`
  fill: #aaa;
  position: absolute;
  right: 10px; /* Adjust the right position to position the right logo */
  top: 50%;
  transform: translateY(-50%);
  width: 18px; /* Set the desired width for the right logo */
  height: auto;
  cursor: pointer;
`;

const PostcodeInput = () => {
  const [invalid, setInvalid] = useState(false);
  const { region, setRegion, resetRegion } = useRegion();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;

    setRegion({ ...region, code: value });
  };

  const { isLoading } = useQuery(
    `https://api.getthedata.com/postcode/${region.code}`,
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
          setInvalid(true);
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
    <InputWrapper>
      <Logo onClick={handleSubmit} aria-label="Submit postcode search" />
      <HiddenLabel className="visually-hidden" htmlFor="postcodeInput">
        Postcode:
      </HiddenLabel>
      <Input
        type="text"
        id="postcodeInput"
        placeholder="Postcode"
        aria-label="Postcode"
        value={region.code}
        invalid={invalid}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        onChange={handleChange}
      />
      {region.code && (
        <ClearInput
          onClick={() => {
            resetRegion();
            navigate(`/`);
          }}
          aria-label="Clear postcode search"
        />
      )}
    </InputWrapper>
  );
};

export default PostcodeInput;
