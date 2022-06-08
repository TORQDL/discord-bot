'use strict';

require('dotenv').config()
// console.debug(process.env) // remove this after you've confirmed it working

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

// // if using .env
// // Discord token is required.
// if (!process.env.DISCORD_BOT_TOKEN) {
//     throw new Error("DISCORD_BOT_TOKEN environment variable missing.");
// }
// const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);
