require("dotenv").config();
const axios = require('axios');

module.exports = service =>{
  // console.log(process.env.API_KEY_SERVICE_ASSETS);
  if (service === "assets") {
    const instance = axios.create({
      baseURL: process.env.SERVICE_ASSETS_URL,
      timeout: 100,
      headers:{
        "Content-type": "application/json",
        "Authorization": process.env.API_KEY_SERVICE_ASSETS
      }
    });

    return instance;
  }
}