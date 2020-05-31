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

//Test da pokedex:
var {pokemonB} = require("./utils/pokedexAPI.js");
client.on("messageCreate", async msg => {
	if(msg.content.startsWith("poke")){
		pokemonB(msg.content.split(" ")[1].toLowerCase()).then(a => {
			msg.channel.createMessage({
				embed: {
					title: "Pokemon Info",
					description: a.nome,
					thumbnail: {
						url: a.img
					},
					image: {
						url: `https://img.pokemondb.net/artwork/${a.nome.toLowerCase()}.jpg`
					}
				}
			})
		});
	}
});

//Login Discord client
client.connect();

module.exports = {
	client
}