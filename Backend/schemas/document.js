const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    document: {
        type: [String]
    },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;