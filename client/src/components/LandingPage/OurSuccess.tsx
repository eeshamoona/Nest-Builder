import { Container, Typography } from '@mui/material';

const OurSuccess = () => {
  return (
    <section id="our-success" className="min-h-screen flex items-center justify-center bg-white">
      <Container className="text-center">
        <Typography variant="h4" component="h2" gutterBottom>
          Our Success
        </Typography>
        <Typography variant="body1">
          Success stories and testimonials.
        </Typography>
        {/* Add your success story carousel here */}
      </Container>
    </section>
  );
};

export default OurSuccess;
