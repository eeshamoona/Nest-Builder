import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import BioCard from "../BioCard";
import { TeamMember } from "../../models/TeamMemberModel";

//TODO: Privatize all of this information so that it isn't on the public repo... maybe a not-committed file?
const coreTeam: TeamMember[] = [
  {
    name: "Eesha Moona",
    title: "Developer",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    bio: "Eesha is a full-stack developer with experience in React, Node.js, and Firebase.",
    email: "eeshamoona@gmail.com",
    github: "https://github.com/eeshamoona",
    linkedin: "https://www.linkedin.com/in/eeshamoona",
    instagram: "https://www.instagram.com/eeshamoona",
  },
  {
    name: "Shaan Ahuja",
    title: "Product Manager",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    bio: "Shaan is a product manager with experience in Agile methodologies and user research.",
    email: "shaanahuja737@gmail.com",
    linkedin: "https://www.linkedin.com/in/shaan-ahuja/",
  },
];

const supporters: TeamMember[] = [
  {
    name: "Chris Bennett",
    title: "Motorola Solutions",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    linkedin: "https://www.linkedin.com/in/alicejohnson",
  },
  {
    name: "Craig Ibbotson",
    title: "Motorola Solutions",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    linkedin: "https://www.linkedin.com/in/craig-ibbotson/",
  },
  {
    name: "Varnit Sinha",
    title: "Motorola Solutions",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    linkedin: "https://www.linkedin.com/in/varnits/",
  },
  {
    name: "John Kim",
    title: "Motorola Solutions",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    linkedin: "https://www.linkedin.com/in/john-r-kim/",
  },
  {
    name: "David Sullivan",
    title: "Motorola Solutions",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    linkedin: "https://www.linkedin.com/in/david-sullivan17/",
  },
  {
    name: "Sebastien Johnson",
    title: "Motorola Solutions",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    linkedin: "https://www.linkedin.com/in/sebastien-johnson/",
  },
  {
    name: "Priya Goel",
    title: "Bank of America",
    imageUrl: "https://image-placeholder.com/100/cccccc",
    linkedin: "https://www.linkedin.com/in/priya-goel-2023/",
  },
  // Add more supporters here
];

const AboutUsPage = () => {
  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        paddingTop: "2rem",
        paddingBottom: "4rem",
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        The Core Team
      </Typography>
      <Stack direction="row" spacing={4} justifyContent="center">
        {coreTeam.map((member) => (
          <BioCard key={member.name} member={member} />
        ))}
      </Stack>
      {/* <Typography variant="h5" align="center" sx={{ marginTop: "4rem" }}>
        Plus support from
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        sx={{
          flexWrap: "nowrap",
          overflowX: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: (theme) =>
            `${theme.palette.divider} ${theme.palette.background.paper}`,
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: "20px",
          },
        }}
      >
        {supporters.map((member) => (
          <AboutUsTeamMember key={member.name} member={member} />
        ))}
      </Stack> */}
    </Box>
  );
};

const AboutUsTeamMember = ({ member }: { member: TeamMember }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Avatar
        alt={member.name}
        src={member.imageUrl}
        sx={{ width: "3rem", height: "3rem", marginTop: "2rem" }}
        onClick={() => window.open(member.linkedin, "_blank")}
      />
      <Typography variant="h6">{member.name}</Typography>
      <Typography variant="body2">{member.title}</Typography>
      {member.email && (
        <Typography variant="body2" color="text.secondary">
          {member.email}
        </Typography>
      )}
    </Box>
  );
};
export default AboutUsPage;
