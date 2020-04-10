const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    ConnectionTypeID: [{type: mongoose.Types.ObjectId, ref: 'ConnectionTypes'}],
    LevelID: [{type: mongoose.Types.ObjectId, ref: 'Levels'}],
    CurrentTypeID: [{type: mongoose.Types.ObjectId, ref: 'CurrentTypes'}],
    Quantity: Number
})

module.exports = mongoose.model('Connections', connectionSchema);