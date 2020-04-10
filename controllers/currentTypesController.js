"use strict";
const currentTypesModel = require("../models/currentTypes");

const currentTypes_list_get = async (req, res) => {
  try {
    const currentTypes = await currentTypesModel.find();
    res.json(currentTypes);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const currentType_get = async (req, res) => {
  try {
    const currentType = await currentTypesModel.findById(req.params.id);
    res.json(currentType);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const currentType_post = (req, res) => {
  try {
    
  }
  catch(e) {

  }
};

module.exports = {
  currentTypes_list_get,
  currentType_get,
  currentType_post,
};
