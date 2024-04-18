// const express = require('express');
// const multer = require('multer');
// const sharp = require('sharp');
// const nodemailer = require('nodemailer');

// const app = express();
// const port = 3000;

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Endpoint to upload and convert image
// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No image file was uploaded' });
//         }

//         const base64Image = req.file.buffer.toString('base64');
//         const outputFilePath = `output_${Date.now()}.jpeg`;

//         await sharp(Buffer.from(base64Image, 'base64'))
//             .jpeg()
//             .toFile(outputFilePath);

//         console.log('Image converted successfully');
//         res.status(200).json({ success: true, message: 'Image uploaded and converted to JPEG successfully', imagePath: outputFilePath });
//     } catch (error) {
//         console.error('Error converting image:', error);
//         res.status(500).json({ error: 'Error converting image' });
//     }
// });

// // Endpoint to share image via Gmail
// app.post('/share-gmail', async (req, res) => {
//     try {
//         const { to, imagePath } = req.body;

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'netflixfam56789@gmail.com',
//                 pass: 'netflixfam'
//             }
//         });

//         const mailOptions = {
//             from: 'netflixfam56789@gmail.com',
//             to: to,
//             subject: 'Shared Image',
//             text: 'Check out this image!',
//             attachments: [
//                 {
//                     filename: 'image.jpeg',
//                     path: imagePath
//                 }
//             ]
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ success: true, message: 'Email sent successfully' });
//     } catch (error) {
//         console.error('Error sharing image via Gmail:', error);
//         res.status(500).json({ error: 'Error sharing image via Gmail' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
