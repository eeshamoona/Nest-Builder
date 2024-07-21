import React from "react";
import {
  Container,
  Typography,
  Button,
  Link,
  Card,
  CardContent,
  Grid,
  Stack,
  Avatar,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import GitHubIcon from "@mui/icons-material/GitHub";
import DevPostLogo from "../../assets/devpost-logo.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const linkedInPosts = [
  {
    id: 1,
    likes: 255,
    content:
      "We won Google's Gen AI Hackathon! 🎉  Eesha Moona and I submitted a project called Nested, a web app powered by Gemini 1.5 that helps people moving to new cities...",
    author: "Shaan Ahuja",
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQG1Z6Z6Q6Q8jw/profile-displayphoto-shrink_800_800/0/1626820190194?e=1637798400&v=beta&t=3Z6Z6Q6Q8jw",
    role: "Associate Product Manager @ Motorola Solutions",
    link: "https://www.linkedin.com/posts/shaan-ahuja_nested-activity-7196991410502328320-WxXQ?utm_source=share&utm_medium=member_desktop",
  },
  {
    id: 2,
    likes: 99,
    content:
      "🏆 🏆 🏆 HUGE CONGRATS to the Google Gen AI Hackathon WINNERS!🏆 🏆 🏆 ",
    author: "Jaclyn Konzelmann",
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQHdFQvZ4zZJjw/profile-displayphoto-shrink_800_800/0/1626820190194?e=1637798400&v=beta&t=3Z4zZJjw",
    role: "Director of Product Management @ Google Gemini API",
    link: "https://www.linkedin.com/posts/jaclynkonzelmann_nested-activity-7197979415132200960-6sga?utm_source=share&utm_medium=member_desktop",
  },
  {
    id: 3,
    likes: 25,
    content:
      "Eesha and Shaan, two talented Motorola Solutions creators! Fantastic job.",
    author: "Chris Bennett",
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQHdFQvZ4zZJjw/profile-displayphoto-shrink_800_800/0/1626820190194?e=1637798400&v=beta&t=3Z4zZJjw",
    role: "Director of AI Transparency and Education @ Motorola Solutions",
    link: "https://www.linkedin.com/posts/chrisbennett1981_nested-activity-7203037613191036931-O7HQ?utm_source=share&utm_medium=member_desktop",
  },
  // Add more posts as needed
];

const SuccessPage = () => {
  return (
    <Container>
      <section
        id="success"
        style={{
          padding: "2em 0",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "#004d40", marginBottom: "1em" }}
        >
          Success Story
        </Typography>
        <Typography variant="h5" style={{ margin: "1em 0" }}>
          🏆 Nested proudly won 1st place at the Google Gen AI Hackathon 2024!
          🏆
        </Typography>
        <Typography
          variant="body1"
          style={{ marginBottom: "2em", padding: "0 2em" }}
        >
          Nested helps you move to a new city with ease by matching you with
          places based on your lifestyle. It analyzes your Google Maps search
          history to understand your preferences, and then provides tailored
          suggestions to nearby grocery stores, gyms, museums, and more!
        </Typography>
        <Stack
          direction="row"
          justifyContent={"center"}
          p="0.5rem"
          gap={"1rem"}
        >
          <Link
            href="https://devpost.com/software/nested"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Button
              startIcon={
                <img
                  src={DevPostLogo}
                  alt="DevPost Logo"
                  style={{ width: 24 }}
                />
              }
              variant="outlined"
              color="success"
              style={{
                marginBottom: "2em",
              }}
            >
              View our Devpost Entry
            </Button>
          </Link>
          <Link
            href="https://github.com/eeshamoona/Nest-Builder"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Button
              startIcon={<GitHubIcon color="action" />}
              variant="outlined"
              color="success"
              style={{
                marginBottom: "2em",
              }}
            >
              View our GitHub Repository
            </Button>
          </Link>
        </Stack>
        <Typography
          variant="h5"
          style={{ color: "#004d40", marginBottom: "1em" }}
        >
          What People Are Saying
        </Typography>
        <Carousel
          indicators={true}
          navButtonsAlwaysVisible
          navButtonsProps={{
            style: {
              border: "none",
              backgroundColor: "#082100",
              color: "#C6EEAA",
              cursor: "pointer",
            },
          }}
          navButtonsWrapperProps={{
            style: {
              paddingLeft: "10rem",
              paddingRight: "10rem",
            },
          }}
        >
          {linkedInPosts.map((post) => (
            <Grid key={post.id} container justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <Card
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "12rem",
                    padding: "1em",
                  }}
                >
                  <CardContent
                    style={{
                      margin: 0,
                      paddingBottom: 0,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1" style={{ fontStyle: "italic" }}>
                      "{post.content}"
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar alt={post.author} src={post.image} />
                      <div>
                        <Typography
                          variant="body2"
                          style={{ fontWeight: "bold" }}
                        >
                          {post.author}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {post.role}
                        </Typography>
                      </div>
                    </Stack>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        href={post.link}
                        target="_blank"
                        style={{
                          color: "#004d40",
                          textDecoration: "none",
                          fontSize: "14px",
                        }}
                      >
                        Read Full Post
                      </Link>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {post.likes}
                        <ThumbUpOffAltIcon />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))}
        </Carousel>
      </section>
    </Container>
  );
};

export default SuccessPage;
