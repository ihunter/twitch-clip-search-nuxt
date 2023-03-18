const moment = require("moment");

const { Broadcaster, Log } = require("../models");

const { addClips } = require("./jobs/addClips");

const FIVE_MINUTES = 5 * 60 * 1000;

const stateManager = {
  week: false,
  month: false,
  year: false,
  all: false,
};

async function init() {
  let broadcasters;
  try {
    broadcasters = await Broadcaster.find();
  } catch (error) {
    console.error("Failed to get broadcasters");
    console.error(error);
  }

  broadcasters.forEach(async (broadcaster) => {
    try {
      const weekLog = await Log.findOneAndUpdate(
        {
          type: "week",
          broadcaster_id: broadcaster.id,
        },
        {},
        { new: true, upsert: true }
      );

      const monthLog = await Log.findOneAndUpdate(
        {
          type: "month",
          broadcaster_id: broadcaster.id,
        },
        {},
        { upsert: true }
      );

      const yearLog = await Log.findOneAndUpdate(
        {
          type: "year",
          broadcaster_id: broadcaster.id,
        },
        {},
        { upsert: true }
      );

      const allLog = await Log.findOneAndUpdate(
        {
          type: "all",
          broadcaster_id: broadcaster.id,
        },
        {},
        { upsert: true }
      );

      if (
        (moment.utc().diff(moment.utc(weekLog.updated_at), "minutes") >= 2 ||
          weekLog.progress === "in-progress") &&
        !stateManager.week
      ) {
        addClips("week", broadcaster, stateManager);
      }

      if (
        (moment.utc().diff(moment.utc(monthLog.updated_at), "hours") >= 1 ||
          monthLog.progress === "in-progress") &&
        !stateManager.month
      ) {
        addClips("month", broadcaster, stateManager);
      }

      if (
        (moment.utc().diff(moment.utc(yearLog.updated_at), "hours") >= 3 ||
          yearLog.progress === "in-progress") &&
        !stateManager.year
      ) {
        addClips("year", broadcaster, stateManager);
      }

      if (
        (moment.utc().diff(moment.utc(allLog.updated_at), "day") >= 6 ||
          allLog.progress === "in-progress") &&
        !stateManager.all
      ) {
        addClips("all", broadcaster, stateManager);
      }
    } catch (error) {
      console.error("Failed to init jobs");
      console.error(error);
    }
  });
}

init();
setInterval(init, FIVE_MINUTES);
