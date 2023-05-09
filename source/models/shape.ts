import mongoose from "mongoose";

export interface IShape extends Document {
    _id: string,
    COD: string,
    SHP: number,
    coordinate: { coordinates: []},
  }

const shapeSchema = new mongoose.Schema(
  {
    _id: {type: String},
    COD: {type: String},
    SHP: {type: Number},
    coordinate: {coordinates: []},
  }
);

const shapes = mongoose.model('shapes', shapeSchema);

export default shapes;