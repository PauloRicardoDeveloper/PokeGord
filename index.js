//Import Discord Libs and setup the Client
var Eris = require("eris");
var client = new Eris.CommandClient(require("./config.json").token, {}, {
	prefix: "p!",
	defaultHelpCommand: false
});

//Call event Ready to do changes on anything
client.once("ready", () => {
	console.log("readyyyyyyyyyy boiiiiiiiii")
	client.editStatus("idle", {name: "Pika... Pika... No seu cu :D", type: 3})
});

var fs = require("fs");
fs.readdir("./comandos", (err, f) => {
	require(`./comandos/${f}`);
})


//Login Discord client
client.connect();

module.exports = {
	client
}