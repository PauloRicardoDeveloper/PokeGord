async function pokemonB(p){
	return await new Promise (function(resolve, reject){
		var request = require("request");
		var cheerio = require("cheerio");
		var {parse} = require("himalaya");

		request("https://pokemondb.net/pokedex/all", (err, res, body) => {
			var $ = cheerio.load(body);
			var data = $("#pokedex tbody").html().replace(/\n/g, "").replace(/<tr>/g, "").split("</tr>");
			data.every(pokes => {
				//Retornar caso de um bug...
				if(parse(pokes)[2] == undefined || parse(pokes)[2].content == ' ') return;
				
				if(parse(pokes)[2].children[0].children[0].content.toLowerCase() == p){
					resolve({nome: parse(pokes)[2].children[0].children[0].content, img: parse(pokes)[0].children[0].children[0].attributes[1].value});
					//Parar o every caso ele ache (n tem tanta utilidade alem de otimização)
					return false;
				}
			})
			//Nome: parse(data)[2].children[0].children[0].content
			//Icone: parse(data)[0].children[0].children[0]
		});
	})
}

module.exports = {
	pokemonB
}