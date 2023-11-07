import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import PageWrapper from "./PageWrapper";
import Generation from "./Generation";
import StatusBar from "./StatusBar";

import categories from "../utilities/categories";
import Loading from "./Loading";

import useRegion from "../hooks/useRegion";
import WindMap from "./WindMap";

const Regional = () => {
  const { region } = useRegion();
  const { code } = useParams();

  const [mix, setMix] = useState();

  const { isLoading } = useQuery(
    `https://api.carbonintensity.org.uk/regional/postcode/${
      code ? code : region.district
    }`,
    {
      enabled: Boolean(code || region.district),
      onSuccess: ({ data }) => {
        console.log(data);
        const { generationmix, intensity, to } = data[0].data[0];

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

        setMix({ generation, intensity, region: data[0].shortname, time: to });
      },
      onError: (data) => console.log(data),
    }
  );

  return (
    <>
      {(isLoading || !mix) && <Loading />}

      {!isLoading && (
        <PageWrapper header="Regional Energy Mix">
          <WindMap />
          <StatusBar
            time={mix.time}
            contextual={{
              title: "Region",
              subtitle: mix.region,
            }}
          />
          <Generation mix={mix} />
        </PageWrapper>
      )}
    </>
  );
};

export default Regional;
