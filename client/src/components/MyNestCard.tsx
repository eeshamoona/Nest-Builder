import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Paper from "@mui/material/Paper";

const MyNestCard = () => {
  const navigate = useNavigate();

  return <Paper elevation={3}></Paper>;
};

export default MyNestCard;
