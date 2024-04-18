const express = require("express");
const axios = require("axios");
const router = express.Router();
const fs = require("fs");
const sharp = require("sharp");
const multer = require("multer");
const upload = multer({ dest: "routes/" });
const path = require("path");

router.post("/conv", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file was uploaded" });
    }

    const base64Image = req.file.buffer.toString("base64");
    const outputFilePath = path.join(__dirname, "output.jpeg");
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
    await sharp(Buffer.from(base64Image, "base64"))
      .jpeg()
      .toFile(outputFilePath);

    console.log("Image converted successfully");
    return res
      .status(200)
      .json({ text: "Image uploaded and converted to JPEG successfully" });
  } catch (error) {
    console.error("Error converting image:", error);
    res.status(500).json({ error: "Error converting image" });
  }
});

router.post("/summarizer", async (req, res) => {
  try {
    const inputText = req.body.text;
    // const response = await axios.post(process.env.SUMMARY, { text: inputText })
    // const summary = response.data.summary
    const summary = "lol placeholder";
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Error summarizing text" });
  }
});
router.get("/conv/latest-image", (req, res) => {
  const uploadsDir = __dirname;

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).json({ error: "Error reading uploads directory" });
    }

    const imageFiles = files.filter((file) => /^output_\d+\.jpeg$/.test(file));
    const latestImageFile = imageFiles.sort().pop(); // Get the last file name (latest)

    if (latestImageFile) {
      res.json({ fileName: latestImageFile });
    } else {
      res.status(404).json({ error: "No image files found" });
    }
  });
});

module.exports = router;
