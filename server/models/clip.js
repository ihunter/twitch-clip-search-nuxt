import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    broadcaster_id: {
      type: String,
      required: true,
    },
    broadcaster_name: {
      type: String,
      required: true,
    },
    // creator_id: {
    //   type: String,
    //   required: true
    // },
    creator_name: {
      type: String,
      required: true,
    },
    // video_id: {
    //   type: String,
    //   required: false
    // },
    game_id: {
      type: String,
      required: true,
    },
    // language: {
    //   type: String,
    //   required: false
    // },
    title: {
      type: String,
      required: true,
    },
    view_count: {
      type: Number,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    } /*, timestamps: { updatedAt: 'updated_at', createdAt: false }*/,
  }
);

schema.index({ title: "text" });
schema.index({ id: 1 });
schema.index({ view_count: 1 });
schema.index({ created_at: 1 });

schema.virtual("broadcaster", {
  ref: "Broadcaster",
  localField: "broadcaster_id",
  foreignField: "id",
  justOne: true,
});

schema.virtual("game", {
  ref: "Game",
  localField: "game_id",
  foreignField: "id",
  justOne: true,
});

schema.plugin(mongoosePaginate);

export default mongoose.model("Clip", schema);
