require("dotenv").config();

const { Clip, Creator } = require("../../models");

const { http } = require("../../utils/twitch-api");
const errorHandler = require("../../utils/axios-error-handling");

async function addCreators() {
  try {
    let creators = await Clip.distinct("creator_id");

    // Filter non games
    creators = creators.filter((creator) => creator !== "");

    // Breakup creators into batches of 100 IDs
    const creatorBatches = [];
    const chunkSize = 100;
    for (let i = 0; i < creators.length; i += chunkSize) {
      creatorBatches.push(creators.slice(i, i + chunkSize).join("&id="));
    }

    const creatorPromises = creatorBatches.map(async (creatorIDs) => {
      const res = await http.get(`users?id=${creatorIDs}`);
      return res.data.data;
    });

    const creatorsDataArray = await Promise.all(creatorPromises);

    const creatorsData = creatorsDataArray.flat();

    await Creator.bulkWrite(
      creatorsData.map((creator) => {
        return {
          updateOne: {
            filter: { id: creator.id },
            update: creator,
            upsert: true,
          },
        };
      })
    );
  } catch (error) {
    console.error("Failed to fetch creators data");
    errorHandler(error);
  }
}

module.exports = {
  addCreators,
};
