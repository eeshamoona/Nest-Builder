import React, { useEffect, useState } from "react";
import { CategoryModel } from "../models/CategoryModel";
import { TransportationModel } from "../models/TransporationModel";
import { SocialPreferenceModel } from "../models/SocialPreferenceModel";
import User from "../models/UserModel";
import { generateAPIRequest } from "../services/ExploreService";
import { ExploreCardModel } from "../models/ExploreCardModel";
import ExploreCard from "./ExploreCard";

interface ExploreCategoryProps {
  user: User;
  address: string[];
  category: CategoryModel;
  transportationPreferences: TransportationModel[];
  socialPreferences: SocialPreferenceModel[];
  lifestylePreferences: string;
  additionalInfo: string;
}

const ExploreCategory = ({
  user,
  address,
  category,
  transportationPreferences,
  socialPreferences,
  lifestylePreferences,
  additionalInfo,
}: ExploreCategoryProps) => {
  const [results, setResults] = useState<ExploreCardModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for category", category.title);
      const response = await generateAPIRequest(
        user,
        address,
        transportationPreferences,
        lifestylePreferences,
        additionalInfo,
        socialPreferences,
        category,
        category.title
      );
      setResults(response);
      setIsLoading(false);
    };

    console.log("ENTERED HERE");
    if (
      user &&
      address.length &&
      category &&
      transportationPreferences.length &&
      socialPreferences.length &&
      lifestylePreferences &&
      additionalInfo
    ) {
      fetchData();
    }
  }, [
    user,
    address,
    category,
    transportationPreferences,
    socialPreferences,
    lifestylePreferences,
    additionalInfo,
  ]);
  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading {category.title}...</h1>
          {/* Display any other relevant information here */}
          <p>Fetching data for user: {user.name}</p>
          <progress value={undefined} />
        </div>
      ) : (
        <>
          <h1>{category.title}</h1>
          {results.map((result) => (
            <ExploreCard key={result.title} result={result} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExploreCategory;
