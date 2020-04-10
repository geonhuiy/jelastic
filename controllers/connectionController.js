"use strict";
const connectionModel = require("../models/connection");

const connection_list_get = async (req, res) => {
  try {
    const connections = await connectionModel.find();
    res.json(connections);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const connection_get = async (req, res) => {
  try {
    const connection = await connectionModel.findById(req.params.id);
    res.json(connection);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const connection_post = (req, res) => {
  try {
    
  }
  catch(e) {

  }
};

module.exports = {
  connection_list_get,
  connection_get,
  connection_post,
};
