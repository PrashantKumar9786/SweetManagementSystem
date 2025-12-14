# Sweet Management System - Frontend

This is the frontend application for the Sweet Management System, built with React, TypeScript, and Material UI. It provides a modern single-page application to interact with the Sweet Management System API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and enhanced with Material UI components.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Features

- **User Authentication**: Registration and login forms with JWT authentication
- **Responsive Dashboard**: Display all available sweets with a beautiful, modern UI
- **Search & Filter**: Easily find sweets by name, category, and price range
- **Purchase System**: Purchase sweets with a simple checkout process
- **Admin Panel**: Admin users can add, update, and delete sweets
- **Role-Based Access Control**: Different features for regular users and administrators

## Project Structure

```
├── public/              # Public assets and HTML template
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication forms
│   │   ├── common/      # Common UI elements
│   │   ├── layout/      # Layout components
│   │   └── sweets/      # Sweet-related components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API service layers
│   └── types/           # TypeScript type definitions
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Backend Integration

This frontend application is designed to work with the Sweet Management System API running on `http://localhost:3000/api`. Make sure the backend server is running before starting the frontend application.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
