"use strict";
const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLNonNull,
} = require("graphql");

const station = require("../models/station");
const connection = require("../models/connection");
const connectiontype = require("../models/connectionTypes");
const currenttype = require("../models/currentTypes");
const level = require("../models/levels");

const rectangleBounds = require("../utils/rectangleBounds");

const connectiontypeType = new GraphQLObjectType({
  name: "connectionType",
  fields: () => ({
    id: { type: GraphQLID },
    FormalName: { type: GraphQLString },
    Title: { type: GraphQLString },
  }),
});

const currenttypeType = new GraphQLObjectType({
  name: "currentType",
  fields: () => ({
    id: { type: GraphQLID },
    Description: { type: GraphQLString },
    Title: { type: GraphQLString },
  }),
});

const stationType = new GraphQLObjectType({
  name: "station",
  fields: () => ({
    id: { type: GraphQLID },
    Connections: {
      type: new GraphQLList(connectiontype),
      resolve(parent, args) {
        return connection.find({ _id: { $in: parent.Connections } });
      },
    },
    Title: { type: GraphQLString },
    AddressLine1: { type: GraphQLString },
    Town: { type: GraphQLString },
    StateOrProvince: { type: GraphQLString },
    Postcode: { type: GraphQLString },
    Location: { type: geoJSONType },
  }),
});

const conenctionType = new GraphQLObjectType({
  name: "connection",
  fields: () => ({
    id: { type: GraphQLID },
    ConnectionType: {
      type: connectiontypeType,
      resolve(parent, args) {
        return connectiontype.findById(parent.ConnectionTypeID);
      },
    },
    LevelType: {
      type: levelType,
      resolve(parent, args) {
        return level.findById(parent.LevelID);
      },
    },
    CurrentType: {
      type: currenttypeType,
      resolve(parent, args) {
        return currenttype.findById(parent.CurrentTypeID);
      },
    },
    Quantity: { type: GraphQLInt },
  }),
});

const levelType = new GraphQLObjectType({
  name: "level",
  fields: () => ({
    id: { type: GraphQLID },
    Comments: { type: GraphQLString },
    IsFastChargeCapable: { type: GraphQLBoolean },
    Title: { type: GraphQLString },
  }),
});

const geoJSONType = new GraphQLObjectType({
  name: "geoJSON",
  fields: () => ({
    type: { type: GraphQLString },
    coordinates: { type: new GraphQLList(GraphQLFloat) },
  }),
});
