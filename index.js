//Import Discord Libs and setup the Client
var Eris = require("eris");
var client = new Eris.CommandClient(require("./config.json").token, {}, {prefix: "!", defaultHelpCommand: true});

//Call event Ready to do changes on anything
client.once("ready", () => {console.log("readyyyyyyyyyy boiiiiiiiii")});

client.on("messageCreate", msg => {
	if(msg.content == "qui si foda"){
		msg.channel.createMessage("É isso ai");
	}
});

var say = client.registerCommand("say", (msg, args) => {
	if(args.length == 0){
		return "Escreveu errado mané";
	}

	return args.join(" ");
});

say.registerSubcommand("reverse", (msg, args) => {
	if(args.length == 0){
		return "Ta faltando coisa";
	}
	return args.join(" ").split("").reverse().join("");
})
//Login Discord client
client.connect();