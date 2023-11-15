const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('description')
    .setDescription('create a note')
    .addStringOption(option =>
      option
        .setName('titulo')
        .setDescription('Titulo de la nota')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('nota')
        .setDescription('nota')
        .setRequired(true)
    ),
  async execute(interaction) {

    try {
      const title = interaction.option.getString('titulo');
      const description = interaction.option.getString('descripcion');

      const statement = 'INSERT INTO notes (title, description, user_id) VALUES (?, ?, ?)';
      db.prepare(statement).run(title, description, interaction.user.id);
      await interaction.reply('Nota creada');

    } catch (error) {
      console.log(error);
    }

  },
};