import { Container, Typography } from '@mui/material';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="min-h-screen flex items-center justify-center bg-white">
      <Container className="text-center">
        <Typography variant="h4" component="h2" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1">
          Follow our simple 3-step process to get started with Nested.
        </Typography>
        {/* Add your 3-step process and video demo here */}
      </Container>
    </section>
  );
};

export default HowItWorks;
