const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currentTypesSchema = new Schema({
    Description: String,
    Title: String
});

module.exports = mongoose.model('CurrentTypes', currentTypesSchema);