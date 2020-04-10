"use strict";
const stationModel = require("../models/station");
const connectionModel = require("../models/connection");

const station_list_get = async (req, res) => {
  try {
    let start = 0;
    let limit = 10;
    if (req.query.start) start = +req.query.start;
    if (req.query.limit) limit = +req.query.limit;
    //let stations = [];
    const stations = await stationModel.find();
    res.json(stations);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const station_get = async (req, res) => {
  try {
    const station = await stationModel.findById(req.params.id).populate({
      path: "Connections",
      populate: [
        { path: "ConnectionTypeID" },
        { path: "CurrentTypeID" },
        { path: "LevelID" },
      ],
    });
    res.json(station);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const station_post = async (req, res) => {
  try {
    const connections = req.body.Connections;
    const newConnections = await Promise.all(
      connections.map(async (conn) => {
        let newConnection = new connectionModel(conn);
        const result = await newConnection.save();
        return result._id;
      })
    );
    const newStation = req.body.Station;
    newStation.connections = new stationModel(station);
    const final = await newStation.save();
    res.json(final);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  station_list_get,
  station_get,
  station_post,
};
