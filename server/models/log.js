const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const logSchema = new Schema({
  date_cursor: {
    type: Date,
    default: Date.now,
  },
  broadcaster_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  progress: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "completed",
  },
  matched: {
    type: Number,
  },
  modified: {
    type: Number,
  },
  inserted: {
    type: Number,
  },
  upserted: {
    type: Number,
  },
  updated_at: {
    type: Date,
    default: moment.utc().subtract(1, "year"),
  },
});

logSchema.virtual("broadcaster", {
  ref: "Broadcaster",
  localField: "broadcaster_id",
  foreignField: "id",
  justOne: true,
});

module.exports.Log = mongoose.model("Log", logSchema);
