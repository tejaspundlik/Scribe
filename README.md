# Model Folder

This part aims to convert images containing text into editable text using an ONNX model and OpenCV for image preprocessing. It utilizes Flask to create a simple API for text extraction from images.

## Project Structure

The project directory contains the following files:

- `app.py`: The main Python file containing the Flask app and image processing logic.
- `configs.yaml`: Configuration file containing model parameters.
- `model.onnx`: The ONNX model file for text recognition.
- `requirements.txt`: A file listing the required Python dependencies.

## Prerequisites

Before running the project, ensure that you have the following dependencies installed:

- Python 3.x
- Flask
- mltu
- numpy
- opencv-python
- tensorflow
- textblob

You can install these dependencies using the provided `requirements.txt` file:

`````powershell pip install -r requirements.txt

## Running the Project

1. Open a terminal or command prompt and navigate to the project directory.
2. Run the Flask app using the following command:

This will start the Flask app and make it accessible at `localhost:5000`.

## Using the API

To extract text from an image, send a POST request to `localhost:5000/predict` with the image file as the `image` parameter. You can use tools like Postman or cURL for this purpose.

Example cURL request:

````powershell curl -X POST -F 'image=@/path/to/image.jpg' localhost:5000/predict`

The API will return a JSON response containing the extracted and corrected text from the image.

```json
{
  "text": "Corrected text from the image"
}
`````
