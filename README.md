# Movie Rating App

Movie Rating App is a web application that allows users to browse, search, and rate movies. It's built using Node.js for the server-side logic and MongoDB as the database to store movie data.

![Movie Rating App](movie-rating-app-screenshot.png)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration and Authentication
- Browse and Search Movies
- Rate Movies and Write Reviews
- User Profiles
- Admin Features (e.g., add/update movies)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

- **MongoDB**: Install and configure MongoDB as your database. You can download it from [mongodb.com](https://www.mongodb.com/).

- **npm or yarn**: Use npm or yarn as your package manager. Install it by running `npm install` or `yarn install`.

## Getting Started

1. **Clone the repository:**

   ```shell
   git clone https://github.com/yourusername/movie-rating-app.git
   cd movie-rating-app

2. Install dependencies:
   npm install

3. Set up environment variables:

  Create a .env file in the project root and define the following environment variables:
  PORT: Port on which the server should run.
  MONGODB_URI: Connection string for your MongoDB database.
  JWT_SECRET: Secret key for JWT token generation.

4. Start the server:
  npm start 

The server will run at http://localhost:3000 by default.

## Usage
  Visit http://localhost:3006 in your web browser to access the Movie Rating App.
  Register or log in to your user account.
  Browse movies, read reviews, and rate movies.
  Admins can manage movies and user accounts.
  
## API Endpoints
The API provides various endpoints for interacting with movies and users. For detailed documentation of API endpoints and request examples, please refer to the API Documentation.

## Database
The application uses MongoDB as the database. You must configure and set up your MongoDB instance.

## Contributing
Contributions are welcome. If you find issues or want to improve the project, please submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See the LICENSE file for details.



