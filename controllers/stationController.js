"use strict";
const stationModel = require("../models/station");
const connectionModel = require("../models/connection");
const rectangleBounds = require("../utils/rectangleBounds");

const station_list_get = async (req, res) => {
  try {
    let start = 0;
    let limit = 10;

    const topRight = req.query.topRight;
    const bottomLeft = req.query.bottomLeft;

    if (req.query.start) start = +req.query.start;
    if (req.query.limit) limit = +req.query.limit;
    let stations = [];
    if (topRight && bottomLeft) {
      const mapBounds = rectangleBounds(
        JSON.parse(topRight),
        JSON.parse(bottomLeft)
      );
      stations = await stationModel
        .find({
          Location: {
            $geoWithin: {
              $geometry: mapBounds,
            },
          },
        })
        .populate({
          path: "Connections",
          populate: [
            { path: "ConnectionTypeID" },
            { path: "CurrentTypeID" },
            { path: "LevelID" },
          ],
        });
    } else {
      stations = await stationModel
        .find()
        .skip(start)
        .limit(limit)
        .populate({
          path: "Connections",
          populate: [
            { path: "ConnectionTypeID" },
            { path: "CurrentTypeID" },
            { path: "LevelID" },
          ],
        });
      res.json(stations);
    }
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
    //First add the connections in the body
    const connections = req.body.Connections;
    const newConnections = await Promise.all(
      connections.map(async (conn) => {
        let newConnection = new connectionModel(conn);
        const result = await newConnection.save();
        return result._id;
      })
    );
    //Create a new station and add the connections
    const newStation = req.body.Station;
    newStation.connections = new stationModel(station);
    //Save the station & connections
    const final = await newStation.save();
    res.status(200).json(final);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const station_put = async (req, res) => {
  try {
    //Edit the connections 
    const connections = await Promise.all(
      req.body.Connections.map(async (conn) => {
        const result = await connectionModel.findByIdAndUpdate(conn._id, conn, {
          new: true,
        });
        return result;
      })
    );
    //Edit station
    const final = await stationModel.findByIdAndUpdate(
      req.body.Station._id,
      req.body.Station,
      { new: true }
    );
    res.json(final);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const station_delete = async (req, res) => {
  try {
    //Delete connections
    const station = await stationModel.findById(req.params.id);
    const delResult = await Promise.all(
      station.Connections.map(async (conn) => {
        return await connectionModel.findByIdAndDelete(conn._id);
      })
    );
    //Delete station
    const result = await stationModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted station", _id: result._id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_put,
  station_delete,
};
