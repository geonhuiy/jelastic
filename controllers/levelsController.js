"use strict";
const levelsModel = require("../models/levels");

const levels_list_get = async (req, res) => {
  try {
    const levels = await levelsModel.find();
    res.json(levels);
  } catch (e) {
    res.status(500).json({message: e.message});
  }
};

const currentType_get = async (req, res) => {
  try {
    const currentType = await levelsModel.findById(req.params.id);
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
  levels_list_get,
  currentType_get,
  currentType_post,
};
