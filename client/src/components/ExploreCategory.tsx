import React, { useEffect, useState } from "react";
import { CategoryModel } from "../models/CategoryModel";
import { TransportationModel } from "../models/TransporationModel";
import { SocialPreferenceModel } from "../models/SocialPreferenceModel";
import User from "../models/UserModel";
import { generateAPIRequest } from "../services/ExploreService";
import { ExploreCardModel } from "../models/ExploreCardModel";
import ExploreCard from "./ExploreCard";
import { Grid } from "@mui/material";

interface ExploreCategoryProps {
  user: User;
  address: string[];
  category: CategoryModel;
  transportationPreferences: TransportationModel[];
  socialPreferences: SocialPreferenceModel[];
  lifestylePreferences: string;
  additionalInfo: string;
  onLoadComplete: () => void;
}

const ExploreCategory = React.memo((props: ExploreCategoryProps) => {
  const [results, setResults] = useState<ExploreCardModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for category", props.category.title);
      const response: ExploreCardModel[] = await generateAPIRequest(
        props.user,
        props.address,
        props.transportationPreferences,
        props.lifestylePreferences,
        props.additionalInfo,
        props.socialPreferences,
        props.category,
        props.category?.title
      );
      console.log("Response IN HERE", response);
      setResults(response);
      props.onLoadComplete();
      setIsLoading(false);
    };

    console.log("ENTERED HERE");

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading {props.category.title}...</h1>
          {/* Display any other relevant information here */}
          <p>Fetching data for user: {props.user.name}</p>
          <progress value={undefined} />
        </div>
      ) : (
        <>
          <h1>{props.category.title}</h1>
          <Grid container spacing={2}>
            {results &&
              results.map((result) => (
                <Grid item xs={12} sm={6} md={4} key={result.title}>
                  <ExploreCard result={result} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </div>
  );
});

export default ExploreCategory;
