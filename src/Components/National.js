import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import PageWrapper from "./PageWrapper";
import Generation from "./Generation";
import StatusBar from "./StatusBar";

import categories from "../utilities/categories";
import Loading from "./Loading";
import Demand from "./Demand";

const National = () => {
  const [mix, setMix] = useState();

  const { isLoading } = useQuery(
    "https://api.carbonintensity.org.uk/generation",
    {
      onSuccess: ({ data }) => {
        const generation = data.generationmix.map((fuelInfo) => {
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

        setMix({ generation, time: data.to });
      },
      onError: (data) => console.log(data),
    }
  );

  return (
    <PageWrapper header="National Energy Mix">
      {(isLoading || !mix) && <Loading />}
      {!isLoading && (
        <>
          <StatusBar
            time={mix.time}
            contextual={{ title: "Price", subtitle: "£100/MWh" }}
          />
          <Demand />
          <Generation mix={mix} />
        </>
      )}
    </PageWrapper>
  );
};

export default National;
