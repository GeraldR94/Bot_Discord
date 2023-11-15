const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bala')
    .setDescription('Replies with Balls!'),
  async execute(interaction) {
    await interaction.reply('Balls!');
  },
};