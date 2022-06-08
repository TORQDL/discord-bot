'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Select a member and kick them (but not really).')
    .addUserOption(option => option.setName('target').setDescription('The member to kick')),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    if (!user) {
      return interaction.reply({ content: 'You did not specify who you wanted to kick.', ephemeral: true });
    } else {
      return interaction.reply({ content: `You wanted to kick: ${user.username}`, ephemeral: true });
    }
  },
};
