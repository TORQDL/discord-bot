"use strict";

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		// console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

        client.commands = new Collection();
        const commandsPath = path.join(__dirname, '..', 'commands').normalize();
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            client.commands.set(command.data.name, command);
        }

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            return command.execute(interaction);
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};
