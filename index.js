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
var ranN = 0;
client.on("messageCreate", async msg => {
	ranN++;
	if(ranN == 4){
		ranN = 0;
		var rnd = Math.floor(Math.random() * 3);
		if(rnd == 1){
			let oCanal = client.getChannel("694901921458421761")
			pokedex.getPokedexByName("kanto").then(a => {
				var objPoke = a.pokemon_entries[Math.floor(Math.random() * a.pokemon_entries.length)];
				oCanal.createMessage({embed: {
					title: "Random Pokemon Spawn!",
					image: {
						url: `https://img.pokemondb.net/artwork/${objPoke.pokemon_species.name}.jpg`
					}
				}})
			})
		}
	}

	if (msg.content.startsWith("poke")) {
		try {
			const pokemon = await pokedex.getPokemonByName(msg.content.split(" ")[1].toLowerCase());
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