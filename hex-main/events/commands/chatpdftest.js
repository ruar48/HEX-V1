const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

module.exports = {
  config: {
    name: "hex",
    usePrefix: false,
    description: "Get the URLs of the first two images when the user replies to an image.",
    permission: 0, // 0 for all users, 1 for admin, 2 for dev
    credits: "giee",
    commandCategory: "template",
    usages: "",
    cooldowns: 5,
  },
  run: async function ({ api, event, args, commandModules }) {
    const geminiApiUrl = "https://gemini.easy0.xyz/v1/completion"; 

    try {
      const text = args.join(" ");
      if (!text) {
        return api.sendMessage("Please provide a question or query", event.threadID, event.messageID);
      }

      
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while processing the command.", event.threadID);
    }
  },
};