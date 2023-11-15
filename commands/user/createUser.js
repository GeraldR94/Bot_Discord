const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');
const { getUserMention } = require('../../utils/discordUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crear-usuario')
    .setDescription('Crear un usuario!')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Tu nombre')
        .setRequired(true)
    ),
  async execute(interaction) {
    const userMentionString = getUserMention(interaction.user.id);
    try {
      const name = interaction.options.getString('nombre');
      const statement = 'INSERT INTO users (user_id, name) VALUES (?, ?)';
      db.prepare(statement).run(interaction.user.id, name);
      await interaction.reply(`${userMentionString} Tu usuario ha sido creado`);
    } catch (error) {
      console.log(error);
      switch (error.code) {
      case 'SQLITE_CONSTRAINT_PRIMARYKEY':
        await interaction.reply(`${userMentionString} Tu usuario ya existe`);
        break;

      default:
        await interaction.reply(`${userMentionString} Hubo un error`);
        break;
      }
    }
  },
};