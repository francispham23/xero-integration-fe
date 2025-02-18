# Xero Integration Frontend

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A React application that integrates with Xero's API for managing financial data.

## Prerequisites

- Node.js (v18 or higher)
- npm
- A Xero account with API access

## Setup Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## API Endpoints

The application interacts with the following endpoints:

### Authentication

- `GET api/xero/auth/authorize`: Initiates Xero OAuth2 flow
- `GET api/xero/auth/callback`: Handles Xero OAuth2 callback
- `GET api/xero/auth/disconnect`: Disconnects from Xero

### Xero Data

- `GET /api/xero/local/accounts`: Retrieves Xero accounts
- `GET /api/xero/local/vendors`: Retrieves Xero vendors

## Testing

To run the test suite:

```bash
npm run test
```

## Project Structure

```
frontend/
├── src/
│   ├── api/          # API integration and services
│   ├── components/   # Reusable React components
│   ├── providers/    # Context providers
│   ├── types/        # TypeScript type definitions
│   └── mockData/     # Mock data for development
├── public/           # Static assets
└── ...config files
```

## Troubleshooting

### Common Issues

1. **Authentication Issues**

   - Ensure your Xero API credentials are correct
   - Check if the redirect URI matches your Xero app configuration

2. **Build Issues**
   - Clear the `node_modules` and reinstall dependencies
   - Ensure you're using the correct Node.js version
