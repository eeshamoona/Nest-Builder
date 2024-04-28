import React, { useEffect, useState, CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateNestAPIRequest } from "../services/NestBuilderService";
import { UserAuth } from "../context/AuthContext";
import { database } from "../firebase.config";
import { ref, get } from "firebase/database";

const NestPage = () => {
  const auth = UserAuth();
  const navigate = useNavigate();
  const [response, setResponse] = useState<any>();
  
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
        runPrompt();
      }
    }
    if (!response) {
      fetchNest();
    }
  }, []);

  // return (
  //   <div>
  //     <div>
  //       {JSON.stringify(response)}
  //     </div>
  //     <div>
  //       {response[0].title}
  //     </div>
  //   </div>
  // )
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
