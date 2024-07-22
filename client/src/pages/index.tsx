import { Container, Typography, Button } from '@mui/material';
import Welcome from '../components/Welcome';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import OurSuccess from '../components/OurSuccess';
import TryItOut from '../components/TryItOut';
import Header from '../components/Header';

const Home = () => {
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

export default Home;
