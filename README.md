# Scribe

Scribe is a mobile application built with React Native and Expo that allows users to capture or select images and convert the text within those images to editable form. The app also provides features like displaying previous conversions, sharing converted text, and user authentication.

## Overview

The Scribe app consists of three main components: a React Native frontend (App), a Python backend for image-to-text conversion (Model), and a Node.js backend for user authentication and document management (Backend).

### App (React Native Frontend)

The App component is a React Native application built with Expo. It provides a user-friendly interface for capturing or selecting images, sending them to the backend for conversion, and displaying the converted text. Users can also view their previous conversions, share the converted text, and authenticate themselves using sign-in and registration functionality.

### Model (Python Backend)

The Model component is a Python backend that handles the image-to-text conversion process. It uses an ONNX model and various libraries like OpenCV and Tesseract OCR to preprocess the images, extract text lines, and perform text recognition. The converted text is then sent back to the App component for display.

### Backend (Node.js Backend)

The Backend component is a Node.js server that handles user authentication and document management. It provides APIs for user registration, login, retrieving documents, adding new documents, and sharing documents with other users. The Backend component interacts with a MongoDB database to store and retrieve user and document data.

## Installation

To run the Scribe app locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/scribe.git
cd scribe
```
### 2. Install dependencies

```bash
cd app
npm install
```

```bash
cd ../model
pip install -r requirements.txt
```

```bash
cd ../backend
npm install
```

## Running

```bash
cd model
python app.py
```

```bash
cd ../backend
npm start
```

```bash
cd ../app
npx expo start
```
Make sure you configure the `localhost` and the `PORT`


<h1 style="text-align: center;">Documentation</h1>

# App

This is the React Native app built with Expo. The app includes screens for user authentication (sign-in and registration), image conversion to text, displaying previous conversions, and sharing text.

## Files and Directories

### `App.js`

The main entry point of the application. It sets up the navigation stack and tab navigators, and renders the appropriate screens based on the user's authentication status.

### `screens/`

This directory contains the various screens of the application.

#### `screens/SignIn.js`

The sign-in screen for user authentication.

#### `screens/Register.js`

The registration screen for new user sign-up.

#### `screens/Home.js`

The home screen that allows users to capture or select an image and convert it to text using the Model.

#### `screens/Intro.js`

The introduction screen displayed at the start of the app.

#### `screens/Firstscan.js`

The screen displayed when the user has no previous conversions.

#### `screens/Share.js`

The screen that allows users to share converted text.

#### `screens/Result.js`

The screen that displays the converted text.

#### `screens/Display.js`

The screen that displays previous text conversions fetched from the Backend.

### `AuthContext.js`

This file contains the authentication context and provider for managing the user's authentication state.

### `package.json` and `package-lock.json`

These files manage the project's dependencies and metadata.

### Other Files and Directories

- `.expo/`: Contains Expo-related configurations and assets.
- `assets/`: Directory for static assets like images and fonts.
- `.gitignore`: Specifies the files and directories to be ignored by Git.
- `babel.config.js`: Configuration file for the Babel transpiler.

## Dependencies

The app uses the following major dependencies:

- `@react-navigation/native`: React Native navigation library.
- `@react-navigation/stack`: Stack navigator for React Navigation.
- `@react-navigation/bottom-tabs`: Bottom tab navigator for React Navigation.
- `expo`: Expo SDK for building React Native apps.
- `expo-image-picker`: Expo module for picking images from the device's gallery or camera.
- `expo-print`: Expo module for generating and printing PDF files.
- `expo-sharing`: Expo module for sharing files and text.
- `react-native-paper`: UI component library for React Native.
- `axios`: HTTP client library for making API requests.

These dependencies are installed using the `npm` or `yarn` package manager and listed in the `package.json` file.

# Backend

This is the backend, a Node.js application built using Express.js, MongoDB, and Mongoose. The application provides APIs for user authentication (registration and login) and document management (adding, retrieving, and sharing).

## Files and Directories

### `index.js`

This is the entry point of the application. It sets up the Express server, connects to the MongoDB database, and defines the API routes.

### `routes/`

This directory contains the route handlers for different API endpoints.

#### `routes/auth.js`

- Handles user authentication routes.
- Provides endpoints for user registration (`/auth/register`) and login (`/auth/login`).

#### `routes/document.js`

- Handles document management routes.
- Provides endpoints for retrieving documents (`/document/get`), adding new documents (`/document/add`), and sharing documents with other users (`/document/share`).

### `schemas/`

This directory contains the Mongoose schema definitions for the database models.

#### `schemas/user.js`

Defines the schema for the `User` model, which includes fields for email and password.

#### `schemas/document.js`

Defines the schema for the `Document` model, which includes fields for the user's email and an array of documents.

### `connection.js`

This file establishes the connection to the MongoDB database using Mongoose.

### Other Files

- `.gitignore`: Specifies the files and directories to be ignored by Git.
- `package.json` and `package-lock.json`: Manage the project's dependencies and metadata.

## Dependencies

The application uses the following major dependencies:

- `express`: Web application framework for Node.js
- `mongoose`: Object Data Modeling (ODM) library for MongoDB and Node.js
- `bcrypt`: Library for hashing passwords
- `dotenv`: Loads environment variables from a `.env` file

These dependencies are installed using the `npm` package manager and listed in the `package.json` file.

# Image to Text Model

This is a Flask application that takes an image as input and predicts the text present in the image using an ONNX model. The application also performs some preprocessing on the image to extract the text lines, and post-processing to correct the predicted text using the TextBlob library.

## Project Structure

### Model Structure

- `app.py`: The main Flask application file.
- `configs.yaml`: Configuration file for the model.
- `model.onnx`: The ONNX model file.
- `predict.jpeg`: The input image file.
- `requirements.txt`: File listing the required Python packages and their versions.

## Dependencies

The required Python packages and their versions are listed in the `requirements.txt` file. Some of the key dependencies are:

- Flask==3.0.3
- mltu==0.1.7
- numpy==1.26.4
- opencv-python==4.9.0.80
- tensorflow==2.9.3
- textblob==0.18.0.post0

## Usage

1. Install the required Python packages by running `pip install -r requirements.txt`.
2. Run the Flask application by executing `python app.py`.
3. Send a POST request to the `/predict` endpoint with an image file in the `image` field.
4. The application will return a JSON response containing the corrected predicted text from the image.

## Code Overview

### `app.py`

- Imports the necessary libraries and modules.
- Defines the `ImageToWordModel` class that inherits from `OnnxInferenceModel` and handles the prediction process.
- Defines the Flask application and the `/predict` route.
- In the `/predict` route:
 - Reads the uploaded image file.
 - Performs preprocessing steps on the image to extract text lines.
 - Iterates over the extracted text lines and uses the `ImageToWordModel` to predict the text in each line.
 - Concatenates the predicted text from all lines.
 - Corrects the predicted text using the TextBlob library.
 - Returns the corrected predicted text as a JSON response.

### `configs.yaml`

This file contains configuration settings for the `ImageToWordModel`, such as the character list (vocabulary) used by the model.

### `model.onnx`

This is the ONNX model file used for text prediction.

### `requirements.txt`

This file lists the required Python packages and their versions for the application to run correctly.

```bash
pip install -r requirements.txt
```

## Request and Response

To send a request to the `/predict` endpoint, you can use a tool like `curl` or a web browser extension like Postman.

### Bash Request

```bash
curl -X POST -F 'image=@/path/to/image.jpg' http://localhost:5000/predict
```

### Response

The application will return a JSON response containing the corrected predicted text from the image

```json
{
    "text": "The corrected predicted text from the image"
}
```