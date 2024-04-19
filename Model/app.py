import cv2
import typing
import numpy as np
import os
from mltu.inferenceModel import OnnxInferenceModel
from mltu.utils.text_utils import ctc_decoder
from mltu.configs import BaseModelConfigs
from textblob import TextBlob
from mltu.transformers import ImageResizer
from flask import Flask,request, jsonify

class ImageToWordModel(OnnxInferenceModel):
    def __init__(self, char_list: typing.Union[str, list], *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.char_list = char_list

    def predict(self, image: np.ndarray):
        image = ImageResizer.resize_maintaining_aspect_ratio(image, *self.input_shape[:2][::-1])
        image_pred = np.expand_dims(image, axis=0).astype(np.float32)

        preds = self.model.run(None, {self.input_name: image_pred})[0]

        text = ctc_decoder(preds, self.char_list)[0]

        return text





app = Flask(__name__)

@app.route('/predict',methods=['POST'])

def predict():

    line_list = []
    if 'image' not in request.files:
        return 'No file part'

    file = request.files['image']
    file_path = os.path.join(app.root_path, "predict.jpeg")
    file.save(file_path)
    image_path = os.path.join(os.path.dirname(os.path.abspath(__file__)),"predict.jpeg")
    img = cv2.imread(image_path)
    # cv2.imshow('image',img)

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    def thresholding(image):
        img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        ret, thresh = cv2.threshold(img_gray, 80, 255, cv2.THRESH_BINARY_INV)
        return thresh


    thresh_img = thresholding(img)
    kernel_horizontal = np.ones((1, 5), np.uint8)
    lines_image = cv2.morphologyEx(thresh_img, cv2.MORPH_CLOSE, kernel_horizontal, iterations=10)
    kernel = np.ones((1, 150), np.uint8)
    dilated = cv2.dilate(thresh_img, kernel, iterations=1)
# cv2.imshow("Dilated", dilated)


    (contours, hierarchy) = cv2.findContours(
        dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE
    )
    sorted_contours_lines = sorted(contours, key=lambda ctr: cv2.boundingRect(ctr)[1])

    for i, ctr in enumerate(contours):
        x, y, w, h = cv2.boundingRect(ctr)
        line_list.insert(0, [x, y, x + w, y + h])
    contour_areas = [cv2.contourArea(cnt) for cnt in contours]
    min_contour_area = int(np.mean(contour_areas))

    filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt)*2.5 > min_contour_area]

    contour_image = img.copy()
    for cnt in filtered_contours:
        x, y, w, h = cv2.boundingRect(cnt)
        cv2.rectangle(contour_image, (x, y), (x + w, y + h+2), (0, 255, 0), 2)

# cv2.imshow('cntr',contour_image)
    img_list = []
    for i, line in enumerate(line_list):
        x, y, x_w, y_h = line
        roi = img[y:y_h, x:x_w]
        img_list.append(roi.copy())
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    configs = BaseModelConfigs.load(os.path.dirname(os.path.abspath(__file__))+"\configs.yaml")
    vocab= ""
    model = ImageToWordModel(model_path=os.path.dirname(os.path.abspath(__file__))+"\model.onnx", char_list =configs.vocab)

    prediction_text = ""
    for image in img_list:
        prediction_text += model.predict(image)


    blob = TextBlob(prediction_text)
    corrected_prediction = str(blob.correct())

    return jsonify({"text":corrected_prediction})

if __name__ == '__main__':
    app.run(host='10.0.53.191', port=5000)