const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const Document = require('../schemas/document')

router.post('/get', async (req, res) => {
    try {
        const email = req.body.email;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userDocument = await Document.findOne({ email });
        if (!userDocument) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json({ document: userDocument.document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { email, content } = req.body;

        const existingLogin = await User.findOne({ email })
        if (!existingLogin) {
            return res.status(409).json({ error: 'User doesn\'t exists' })
        }

        let existingDocument = await Document.findOne({ email });
        if (!existingDocument) {
            const newDocument = new Document({
                email: email,
                document: [content]
            })
            existingDocument = await newDocument.save();
        }

        existingDocument.document.push(content);

        const savedDocument = await existingDocument.save();
        res.status(200).json({ message: "Successful" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/share', async (req, res) => {
    try {
        const { to, content } = req.body;

        const existingLogin = await User.findOne({ email: to })
        if (!existingLogin) {
            return res.status(409).json({ error: 'User doesn\'t exists' })
        }

        let existingDocument = await Document.findOne({ email: to });
        if (!existingDocument) {
            const newDocument = new Document({
                email: to,
                document: [content]
            })
            existingDocument = await newDocument.save();
            return res.status(200).json({ message: "Successful" })
        }

        existingDocument.document.push(content);
        const savedDocument = await existingDocument.save();
        res.status(200).json({ message: "Successful" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router