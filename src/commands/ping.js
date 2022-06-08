"use strict";

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        // return interaction.reply('Pong!');

        // send an initial reply
        await interaction.reply({ content: 'Pong!', fetchReply: true })
            .then((replyMessage) => {
                console.log(`Reply sent with content ${replyMessage.content}`);
                // send a followup
                const followUpMessage = interaction.followUp({
                    content: "Follow up message",
                    embeds: [new MessageEmbed().setDescription("Follow up test")],
                    fetchReply: true
                    })
                    .then((replyFollowUp) => {
                        console.log(`Reply sent to follow-up with content ${replyFollowUp.content}`);
                    });
                setTimeout(() => {
                    // delete initial reply
                    // replyMessage.delete().catch(console.error);
                    // Edit the initial reply
                    replyMessage.edit("Edited reply that used to say Pong!", followUpMessage);
                }, 5000);
            })
            .catch(console.error);
    },
};
