# Image to Word Model

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