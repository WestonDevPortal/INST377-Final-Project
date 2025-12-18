## Developer Manual

 ## Overview

This section is intended for future developers who may take over this project. It assumes general knowledge of web applications but no prior familiarity with this system. The purpose is to explain how to set up, run, and continue development of the Weather Tracker application.

## Setup

Install Node.js.

Clone or download this repository.

From the project root directory, install dependencies by running npm install.

Create a .env file in the root directory.

## Environment Variables

The application requires the following environment variables to run correctly:

WEATHERSTACK_API_KEY = 519e8622bc7f35d1349ee1bf592f5a1e

SUPABASE_URL = https://supabase.com/dashboard/project/fonpfsovehrjbwvnryfz

SUPABASE_ANON_KEY = t4xw75Fml7kbfOpF

These variables are used to connect to the Weatherstack API and the Supabase database.
The .env file should not be committed to GitHub.
For the deployed version, these values are configured directly in the Vercel dashboard.

## Running the Application

To run the application locally, start the server using npm start.

Once running, the application will be at:
http://localhost:3000

In production, the backend runs using Vercel serverless functions.

## API Endpoints
GET /api/weather?location=city

Fetches current weather data for the specified city from the Weatherstack API.
This endpoint also stores the searched city in the Supabase database.

Used by the front end to:

Display current temperature and conditions

Calculate wind chill or heat index

Determine weather risk indicators

GET /api/history

Retrieves a list of previously searched cities from the Supabase database, ordered by most recent.

Used by the front end to:

Identify the most recent search

Generate the temperature trend visualization on the Forecast page

## Testing

This project does not currently include automated tests.
Testing was performed manually by running the application locally, verifying weather data for multiple cities, confirming database reads and writes in Supabase, and testing the deployed version on Vercel.

Future developers may add automated tests using tools such as Jest or Playwright.

## Known Issues

The Weatherstack free tier does not provide true multi-day forecast data.

The 7 day temperature trend is generated based on current conditions.

## Future Development

Integrate a paid weather API tier for real forecast data

Add user accounts and saved locations

Improve accessibility and error messaging

Add automated testing

Migrate the front end to a framework such as React
