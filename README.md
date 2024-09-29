# Laundry App Project

This repository contains the server-side code, client-side admin panel, and the React Native mobile application for the Laundry App project. The project includes a Node.js backend server, a React.js admin panel, and a React Native mobile app.

## File Structure

- `/app` - React Native mobile application
- `/backend` - Node.js backend server
- `/backend/web` - React.js admin panel ui

## Demo Links

- **Admin Panel Demo**: [Demo](https://loundry-app.onrender.com/)
- **React Native APK**: [Download APK](https://drive.google.com/file/d/1p-EWww4OkbTcrlavTMkFtv9Aaw-DG-LB/view?usp=drive_link)

### Admin Panel Credentials
- ***Username***: `admin`
- ***Password***: `admin123`

## Project Setup

### Server Side

To set up the server, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/akram6t/laundry-app.git
    cd laundry-app
    ```

2. **Install dependencies**:
    ```sh
    cd backend
    npm install
    ```

3. **Environment Variables**:
    Create a `.env` file in the root of the `backend` directory and add the following variables:
    ```env
    # MongoDB connection string with database name
    DB_URL=mongodb://127.0.0.1/loundy-app

    # API Key for the project
    API_KEY=c2964966ece452dba2b8d4c029c8d73

    # JWT Secret Key for admin login
    JWT_SECRET=MY_SECRET_KEY

    # Nodemailer configuration for sending emails
    NODEMAILER_EMAIL=yournodemaileremail@gmail.com
    NODEMAILER_APP_PASSWORD=NODE_MAILER_PASSWORD
    ```

4. **Run the server**:
    ```sh
    npm run dev
    or
    npm start
    ```

### Client Side (React Admin Panel)

To set up the client-side admin panel, follow these steps:

1. **Navigate to the client directory**:
    ```sh
    cd backend/web
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Environment Variables**:
    Create a `.env` file in the root of the `backend/web` directory and add the following variables:
    ```env
    # Server URL for the client to connect to
    REACT_APP_SERVER_URL=http://localhost:5000

    # API Key for the project
    REACT_APP_SERVER_API_KEY=c2964966ece452dba2b8d4c029c8d73
    ```

4. **Run the client**:
    ```sh
    npm start
    ```

## Features

### Server (Node.js)

- **Express.js**: Web framework for Node.js.
- **Mongodb**: Mongodb Database.
- **JWT**: JSON Web Token for authentication.
- **Nodemailer**: For sending emails.
- **expo-server-sdk**: For sending notifications on react native application.

### Client (React.js)

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: A toolkit for managing states.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **TailwindCss**: for Styling the web ui.
- **Chartjs**: Visualize the matrics data in ui.

## Additional Notes

- Ensure that the same `API_KEY` is used throughout the entire project (Node.js server, React admin panel, and any other integrations) to maintain consistency and security.
- If the client (React admin panel) is hosted on a different URL/path than the server, set the `REACT_APP_SERVER_URL` environment variable accordingly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [developeruniqe@gmail.com](mailto:developeruniqe@gmail.com).
