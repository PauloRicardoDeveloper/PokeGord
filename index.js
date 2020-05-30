//Import Discord Libs and setup the Client
var Discord = require("discord.js");
var client = new Discord.Client();

//Call event Ready to do changes on anything
client.once("ready", () => {console.log("readyyyyyyyyyy boiiiiiiiii")});

//Login Discord client
var configX = require("./config.json");
client.login(configX.token);