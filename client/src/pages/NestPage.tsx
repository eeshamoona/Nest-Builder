import React, { useEffect, useState, CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateNestAPIRequest } from "../services/NestBuilderService";
import { UserAuth } from "../context/AuthContext";
import { database } from "../firebase.config";
import { ref, get } from "firebase/database";
import { CategoryModel } from "../models/CategoryModel";

const NestPage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();
  const [response, setResponse] = useState<any>();

  async function fetchCategories(): Promise<CategoryModel[] | null> {
    if (auth?.user) {
      const categoriesRef = ref(database, `users/${auth.user.id}/categories`);
      const categoriesSnapshot = await get(categoriesRef);
      const categoriesData = categoriesSnapshot.val();

      if (categoriesData) {
        const categoriesArray = Object.entries(categoriesData).map(
          ([id, category]) => ({
            ...(category as CategoryModel),
          })
        );
        console.log(JSON.stringify(categoriesArray[0]));
        return categoriesArray;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  
  useEffect(() => {
    const fetchNest = async () => {
      if (auth?.user) {
        const runPrompt = async () => {
          const response = await generateNestAPIRequest(
            "chicago",
            "entertainment",
            "bus",
            20,
            70,
            "casual"
          );

          setResponse(response);
        }
        fetchCategories();
        runPrompt();
      }
    }
    if (!response) {
      fetchNest();
    }
  }, []);

  if (!response) {
    return <div />
  }

  return (
    <div>
      <div>
        {JSON.stringify(response)}
      </div>
      <div>
        {response[0].title}
      </div>
    </div>
  )
}


export default NestPage;
