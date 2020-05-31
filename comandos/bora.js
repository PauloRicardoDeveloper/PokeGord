var {client} = require("../index.js");

client.registerCommand("deu", (msg, args) => {
	if(msg.author.id == "149100608555581440") return "ta sem perm kkk"
	return "o"
}, {
	caseInsensitive: true,
	cooldown: 15000,
	cooldownMessage: "fodaaaaaaa",
	aliases: ["f", "de"]
});
