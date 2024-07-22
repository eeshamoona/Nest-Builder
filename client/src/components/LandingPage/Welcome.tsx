import { Button, Typography, Container } from '@mui/material';

const Welcome = () => {
  return (
    <section id="welcome" className="h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      <Container className="flex flex-col items-center justify-center">
        <Typography variant="h2" component="h1" className="text-5xl font-product-sans-bold mb-8">
          Nested
        </Typography>
        <Typography variant="h6" component="p" className="text-xl mt-4 mb-8">
          Moving is stressful. Nested, powered by AI, helps you find the perfect places in your new city – from gyms and grocery stores to hidden gems – all based on your preferences.
        </Typography>
        <div className="flex justify-center space-x-4">
          <Button variant="contained" className="bg-green-600 text-white hover:bg-green-700">Try a Demo</Button>
          <Button variant="outlined" className="text-green-600 border-green-600 hover:bg-green-100">Request Beta Access</Button>
        </div>
      </Container>
    </section>
  );
};

export default Welcome;
