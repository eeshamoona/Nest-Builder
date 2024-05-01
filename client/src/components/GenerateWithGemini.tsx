import { Stack, Typography, Tooltip, Link } from "@mui/material";
import React from "react";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useTheme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";

interface GenerateWithGeminiProps {
  prompt: string;
}
const GenerateWithGemini = ({ prompt }: GenerateWithGeminiProps) => {
  const theme = useTheme();

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      <AutoAwesomeIcon style={{ fontSize: "1rem" }} />
      <Typography variant="caption">
        Generated with{" "}
        <Link
          style={{ color: theme.palette.success.main }}
          href="https://gemini.google.com"
        >
          Gemini
        </Link>
      </Typography>
      <Tooltip
        sx={{ cursor: "pointer" }}
        title={<ReactMarkdown children={prompt} />}
        placement="top"
        arrow
      >
        <InfoRoundedIcon style={{ fontSize: "1rem" }} />
      </Tooltip>
    </Stack>
  );
};

export default GenerateWithGemini;
