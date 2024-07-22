import { Container, Typography, Button } from '@mui/material';
import Welcome from '../components/LandingPage/Welcome';
import HowItWorks from '../components/LandingPage/HowItWorks';
import AboutUs from '../components/LandingPage/AboutUs';
import OurSuccess from '../components/LandingPage/OurSuccess';
import TryItOut from '../components/LandingPage/TryItOut';
import Header from '../components/LandingPage/Header';

const LandingPage = () => {
  return (
    <>
      <Header />
      <Container>
        <Welcome />
        <HowItWorks />
        <AboutUs />
        <OurSuccess />
        <TryItOut />
      </Container>
    </>
  );
};

export default LandingPage;
