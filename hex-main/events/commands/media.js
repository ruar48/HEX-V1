const axios = require("axios");
const fs = require('fs')
module.exports = {
  config: {
    name: "dl" ,
    usePrefix: false,
    description: "Facebook and Tiktok Downloader",
    permission: 0,  //// 0|1|2   -0 all user  - 1 for admin and 3 for dev 
    credits: "reygie",
    description: "",
    commandCategory: "Download",
    usages: "",
	cooldowns: 5,
  },
  run: async function({ api, event, args, commandModules }) {
  const _url_tiktok = "https://api.easy-api.online/api/tiktok?url=";
  const _url_fb = "https://api.easy-api.online/api/fbdl?q=";
  const _url = args.join(" ")
try{
 const generateApiUrl = (url) => {
  const tiktokPattern = /^https:\/\/vt\.tiktok\.com\//;
  const facebookPattern = /^https:\/\/www\.facebook\.com\//;
 const fb2 = /^https:\/\/fb\.watch\\/;
  if (tiktokPattern.test(url)) {
    return `https://api.easy-api.online/api/tiktok?url=${encodeURIComponent(
      url,
    )}`;
  } else if (facebookPattern.test(url)) {
    return `https://api.easy-api.online/api/fbdl?q=${encodeURIComponent(url)}`;
    
  } else if(fb2.test(url)){
          return `https://api.easy-api.online/api/fbdl?q=${encodeURIComponent(url)}`;

  } else {
    return null;
  }
};
const apiUrl = generateApiUrl(_url);

    const download = await axios.get(apiUrl);
    const vidurl = download.data.url;
  const vid = (await axios.get(vidurl,
              { responseType: 'arraybuffer' }
          )).data;
          fs.writeFileSync('cache/dl.mp4',Buffer.from(vid, 'binary'));

          const mes = {
              body: `Here's the video for you.`,
              attachment: fs.createReadStream('cache/dl.mp4')
          };
          api.sendMessage(mes, event.threadID, event.messageID);

}
catch(error){
  console.log(error);
}

  },
};  