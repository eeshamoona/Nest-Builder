import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { SvgIcon } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { TeamMember } from "../models/TeamMemberModel";

interface BioCardProps {
  member: TeamMember;
}
const BioCard = ({ member }: BioCardProps) => {
  const handleEmailClick = () => {
    const email = member.email || "";
    window.location.href = `mailto:${email}`;
  };
  return (
    <Box
      sx={{
        width: "27rem",
        maxWidth: "100%",
        boxShadow: "lg",
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingTop: "2rem",
          paddingBottom: "1rem",
          gap: "2rem",
        }}
      >
        <Avatar
          alt={member.name}
          src={member.imageUrl}
          sx={{ width: "4rem", height: "4rem" }}
        />
        <Typography variant="h4" align="center" gutterBottom>
          {member.name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {member.bio && ( // Render bio only if it exists
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {member.bio}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          margin: "0.5rem",
          width: "100%",
        }}
      >
        {member.github && ( // Render GitHub icon only if URL exists
          <IconButton href={member.github} target="_blank" rel="noreferrer">
            <SvgIcon>
              <GitHubIcon />
            </SvgIcon>
          </IconButton>
        )}
        {member.linkedin && ( // Render LinkedIn icon only if URL exists
          <IconButton href={member.linkedin} target="_blank" rel="noreferrer">
            <SvgIcon>
              <LinkedInIcon />
            </SvgIcon>
          </IconButton>
        )}
        {member.instagram && ( // Render Instagram icon only if URL exists
          <IconButton href={member.instagram} target="_blank" rel="noreferrer">
            <SvgIcon>
              <InstagramIcon />
            </SvgIcon>
          </IconButton>
        )}
        {member.twitter && ( // Render Twitter icon only if URL exists
          <IconButton href={member.twitter} target="_blank" rel="noreferrer">
            <SvgIcon>
              <TwitterIcon />
            </SvgIcon>
          </IconButton>
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
      >
        <Button variant="outlined" color="success" onClick={handleEmailClick}>
          Message Me
        </Button>
      </Box>
    </Box>
  );
};

export default BioCard;
