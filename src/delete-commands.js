'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.get(Routes.applicationGuildCommands(clientId, guildId))
  .then(data => {
    const promises = [];
    for (const command of data) {
      const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
      console.log('Deleting URL: ' + deleteUrl);
      promises.push(rest.delete(deleteUrl));
    }
    return Promise.all(promises);
  })
  .then(() => console.log('Successfully deleted application commands.'))
  .catch(console.error);
