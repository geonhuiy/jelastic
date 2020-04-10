const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionTypesSchema = new Schema({
    FormalName: String,
    Title: String
})

module.exports = mongoose.model('ConnectionTypes', connectionTypesSchema);