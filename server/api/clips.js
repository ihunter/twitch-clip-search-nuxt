import { Clip } from "../models";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    const clipsData = await Clip.find().limit(10);
    console.log(clipsData);
    return clipsData;
  } catch (error) {
    console.log(error);
    setResponseStatus(event, 500);
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
