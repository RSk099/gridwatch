import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

import PageWrapper from "./PageWrapper";
import Generation from "./Generation";
import StatusBar from "./StatusBar";

import categories from "../utilities/categories";
import Loading from "./Loading";

import useRegion from "../hooks/useRegion";

const Regional = () => {
  const { postcode, setPostcode } = useRegion();
  const { code } = useParams();

  const [mix, setMix] = useState();

  useEffect(() => {
    if (code && !postcode) {
      setPostcode(code);
    }
  }, [code, postcode]);

  const { isLoading } = useQuery(
    `https://api.carbonintensity.org.uk/regional/postcode/${code}`,
    {
      enabled: Boolean(code),
      onSuccess: ({ data }) => {
        const { generationmix, intensity } = data[0].data[0];

        const generation = generationmix.map((fuelInfo) => {
          for (const category in categories) {
            if (categories[category].includes(fuelInfo.fuel)) {
              return {
                ...fuelInfo,
                category,
              };
            }
          }
          return {
            ...fuelInfo,
            category: "Uncategorized",
          };
        });

        setMix({ generation, intensity });
      },
      onError: (data) => console.log(data),
    }
  );

  if (isLoading || !mix) {
    return <Loading />;
  }

  return (
    <PageWrapper header="Regional Energy Mix">
      <StatusBar
        contextual={{ title: "Region", subtitle: code.toUpperCase() }}
      />
      <Generation mix={mix} />
    </PageWrapper>
  );
};

export default Regional;
