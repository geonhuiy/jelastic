"use strict";
const connectionTypesModel = require("../models/connectionTypes");

const connectionTypes_list_get = async (req, res) => {
  try {
    const connectionTypes = await connectionTypesModel.find();
    res.json(connectionTypes);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const connectionType_get = async (req, res) => {
  try {
    const connectionType = await connectionTypesModel.findById(req.params.id);
    res.json(connectionType);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const connectionType_post = (req, res) => {
  try {
    
  }
  catch(e) {

  }
};

module.exports = {
  connectionTypes_list_get,
  connectionType_get,
  connectionType_post,
};
