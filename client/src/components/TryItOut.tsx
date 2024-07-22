import { Container } from '@mui/material';

const TryItOut = () => {
  return (
    <section id="try-it-out" className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container className="text-center">
      <div className="try-it-out max-w-3xl mx-auto text-center py-16">
      <div className="try-it-out__content space-y-8 px-8">
        <div className="try-it-out__header">
          <h3 className="try-it-out__title text-3xl font-bold mb-4">Try it Out!</h3>
          <p className="try-it-out__description text-lg mb-4">
            Discover how Nested can transform your move to a new city. Our secure demo lets you explore all features without creating an account or saving your personal data. When you're ready, request beta access to try Nested with your own data.
          </p>
        </div>
        <div className="try-it-out__actions flex justify-center space-x-8">
          <div className="try-it-out__action text-center">
            <div className="space-y-2">
              <button className="try-it-out__button try-it-out__button--primary bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Launch Demo
              </button>
              <p className="try-it-out__caption text-sm text-gray-500">No sign-up required. Data-safe demo.</p>
            </div>
          </div>
          <div className="try-it-out__action text-center">
            <div className="space-y-2">
              <button className="try-it-out__button try-it-out__button--secondary border border-green-600 text-green-600 py-2 px-4 rounded hover:bg-green-100">
                Request Beta Access
              </button>
              <p className="try-it-out__caption text-sm text-gray-500">Try Nested with your own data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </Container>
    </section>
  );
};

export default TryItOut;
