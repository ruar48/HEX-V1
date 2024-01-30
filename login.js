const login = require('fca-project-orion');
const config = require('./config.json');
const approved = require('./approved.json');
const approvedID = approved;
const prefix = config.prefix;

function hexstart(appState) {
  login({ appState: appState }, (error, api) => {
    if (error) {
      console.error(error);
      return;
    }

    const platform = process.platform;
    let userAgent;

    if (platform === 'win32') {
      userAgent =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36';
    } else {
      userAgent =
        platform === 'android'
          ? 'Mozilla/5.0 (Linux; Android 11; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36'
          : 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/95.0.4638.50 Mobile/15E148 Safari/604.1';
    }

    api.setOptions({
      forceLogin: true,
      listenEvents: true,
      logLevel: 'silent',
      selfListen: false,
      userAgent: userAgent,
    });

    const eventHandler = require('./hex-main/events/eventhandler.js');
    eventHandler.run({
      api: api,
      config: config,
      prefix: prefix,
      approvedID: approvedID,
    });

    console.log('[ HEX AI ] > DEVELOPED BY REYGIE');
  });
}

module.exports = { hexstart: hexstart };