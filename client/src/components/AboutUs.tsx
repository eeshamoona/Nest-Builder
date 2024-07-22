import { Container, Avatar, Box, Typography, Button, IconButton, SvgIcon } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EeshaImage from "../../public/Eesha_Moona_Image.png"
import ShaanImage from "../../public/Shaan_Ahuja_Image.png"

const coreTeam = [
  {
    name: "Eesha Moona",
    title: "Developer @ Motorola Solutions",
    imageUrl: "../../public/Eesha_Moona_Image.png",
    bio: "Eesha is a full-stack developer with extensive experience in building robust applications using React, Node.js, and Firebase. Her technical expertise and passion for coding have been instrumental in bringing Nested to life. Eesha's commitment to creating seamless user experiences ensures that our application runs smoothly and efficiently, helping users transition to new cities with ease.",
    email: "eeshamoona@gmail.com",
    github: "https://github.com/eeshamoona",
    linkedin: "https://www.linkedin.com/in/eeshamoona",
    instagram: "https://www.instagram.com/eeshamoona",
  },
  {
    name: "Shaan Ahuja",
    title: "Product Manager @ Doss",
    imageUrl: "../../public/Shaan_Ahuja_Image.png",
    bio: "Shaan is an experienced product manager specializing in Agile methodologies and user research. With a keen eye for detail and a deep understanding of user needs, Shaan has played a pivotal role in shaping the vision and strategy for Nested. His ability to bridge the gap between technical and non-technical teams ensures that our product meets and exceeds user expectations.",
    email: "shaanahuja737@gmail.com",
    linkedin: "https://www.linkedin.com/in/shaan-ahuja/",
  },
];

const AboutUs = () => {
  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <section id="about-us" className="h-screen flex items-center justify-center">
      <Container className="text-center">
        <Typography variant="h4" component="h2" gutterBottom>
          About Us
        </Typography>
        <div className="w-11/12 mx-auto py-8">
      <Typography variant="h3" align="center" gutterBottom>
        The Core Team
      </Typography>
      <div className="flex flex-wrap justify-center">
        {coreTeam.map((member) => (
          <div key={member.name} className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-4">
            <div className="flex justify-center mt-4">
              <Avatar alt={member.name} src={member.imageUrl} className="w-24 h-24" />
            </div>
            <div className="text-center px-6 py-4">
              <Typography variant="h4" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {member.title}
              </Typography>
              <Typography variant="body1" className="mb-4">
                {member.bio}
              </Typography>
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {member.github && (
                <IconButton href={member.github} target="_blank" rel="noreferrer">
                  <SvgIcon>
                    <GitHubIcon />
                  </SvgIcon>
                </IconButton>
              )}
              {member.linkedin && (
                <IconButton href={member.linkedin} target="_blank" rel="noreferrer">
                  <SvgIcon>
                    <LinkedInIcon />
                  </SvgIcon>
                </IconButton>
              )}
              {member.instagram && (
                <IconButton href={member.instagram} target="_blank" rel="noreferrer">
                  <SvgIcon>
                    <InstagramIcon />
                  </SvgIcon>
                </IconButton>
              )}
            </div>
            <div className="flex justify-center mb-4">
              <Button variant="outlined" color="success" onClick={() => handleEmailClick(member.email)}>
                Message Me
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
      </Container>
    </section>
  );
};

export default AboutUs;
