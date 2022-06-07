require('dotenv').config()
// console.debug(process.env) // remove this after you've confirmed it working

import Discord from "discord.js";

const onReady = () => {
    console.log("Connected");
    
    if (client.user) {
        console.log(`Logged in as ${client.user.tag}.`);
    }
}

const onMessage = (message: Discord.Message) => { 
    // Don't respond to bots.
    if (message.author.bot) {
        return;
    }

    if (message.content.toLowerCase() == "ping") {
        message.reply("Pong!");
    }
}

// Create a new client instance
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on('ready', onReady);
client.on('message', onMessage);

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nCreated: ${interaction.guild.createdAt}\nVerification Level: ${interaction.guild.verificationLevel}`);
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

// // if using .env
// // Discord token is required.
// if (!process.env.DISCORD_TOKEN) {
//     throw new Error("DISCORD_TOKEN environment variable missing.");
// }
// const discordToken: string = process.env.DISCORD_TOKEN;
// client.login(discordToken);

// if using config.json
const { token } = require('./config.json');
client.login(token);
