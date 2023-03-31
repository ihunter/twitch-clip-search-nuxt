import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    box_art_url: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    } /*, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } */,
  }
);

schema.index({ id: 1 });
schema.index({ name: "text" });

schema.virtual("clips", {
  ref: "Clip",
  localField: "id",
  foreignField: "game_id",
});

export default mongoose.model("Game", schema);
