# Nested

Nested helps you move to a new city with ease by matching you with places based on your lifestyle preferences. By analyzing your Google Maps search history, Nested understands your preferences and provides tailored suggestions for nearby grocery stores, gyms, museums, or any type of place you can think of!

## Getting Started

These instructions will guide you on how to set up and run Nested locally for development and testing purposes.

### Prerequisites

To run Nested, you will need:

- Node.js and npm for the client
- Python 3 and pip for the server

### Installing

Follow these steps to get your development environment running:

#### Client

1. Clone the repository and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React client:
   ```bash
   npm run start
   ```

#### Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   # Install any other necessary packages
   ```
3. Start the Flask Server:
   ```bash
   python3 server.py
   ```

### Configuration

Before running the application, You will need Firebase Auth or GCP API credentials to get the necessary information.

1. Create `.env` files in both the client and server directories. Below is an example of what the `.env` file might look like:

   ```plaintext
   # Client
    REACT_APP_apiKey=YOUR_API_KEY
    REACT_APP_authDomain=YOUR_AUTH_DOMAIN
    REACT_APP_projectId=YOUR_PROJECT_ID
    REACT_APP_storageBucket=YOUR_STORAGE_BUCKET
    REACT_APP_messagingSenderId=YOUR_MESSAGING_SENDER_ID
    REACT_APP_appId=YOUR_APP_ID
    REACT_APP_measurementId=YOUR_MEASUREMENT_ID

    REACT_APP_peopleAPIKey=YOUR_PEOPLE_API_KEY
    REACT_APP_googleMapsAPIKey=YOUR_GOOGLE_MAPS_API_KEY

    REACT_APP_geminiAIKey=YOUR_GEMINI_AI_KEY
   ```

   ```plaintext
   # Server
   export REACT_APP_geminiAIKey=YOUR_GEMINI_AI_KEY
   export REACT_APP_googleMapsAPIKey=YOUR_GOOGLE_MAPS_API_KEY
   export REACT_APP_placesAPIKey=YOUR_PLACES_API_KEY
   ```

## Built With

- **Frontend**: React, TypeScript, Material UI
- **Backend**: Flask, Python
- **APIs**: Google Places API, Distance Matrix API, Geocoding API, Identity Toolkit API, Maps Javascript API, Generative Language API, Token Service API, Google Drive API, & People API
- **Database and Authentication**: Firebase

## Contributing

If you're interested in contributing to Nested, please read through the project files and contact the main author to see how you can help.

### Main Author

- **Eesha Moona** - _Initial work_ - [eeshamoona@gmail.com](mailto:eeshamoona@gmail.com)

## Acknowledgments

- Thanks to all the developers and contributors who made this project possible.
- Special thanks to Google for providing the APIs that power our application.

## License

This project is licensed under the MIT License - see the LICENSE file in the repository for more details.
