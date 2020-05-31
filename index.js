//Import Discord Libs and setup the Client
var Eris = require("eris");
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();
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
client.on("messageCreate", async msg => {
	if (msg.content.startsWith("poke")) {
		try {
			const pokemon = await pokedex.getPokemonByName(msg.content.split(" ")[1].toLowerCase());
			console.log(pokemon)
			msg.channel.createMessage({
				embed: {
					title: "Pokemon Info",
					description: pokemon.name,
					thumbnail: {
						url: pokemon.sprites.front_shiny
					},
					image: {
						url: `https://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`
					}
				}
			})
		} catch (error) {
			if(error.response.status === 404)
				msg.channel.createMessage('Não encontrei esse pokemon')
			else msg.channel.createMessage('Erro ' + error.response.status)
		}
	}
});

//Login Discord client
client.connect();

module.exports = {
	client
}