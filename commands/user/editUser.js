const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');
const { getUserMention } = require('../../utils/discordUtils');
const { getUser } = require('../../utils/dbUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('editar-usuario')
    .setDescription('Edita tu usuario!')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Tu nombre')
        .setRequired(true)
    ),
  async execute(interaction) {
    const discordId = interaction.user.id;
    const name = interaction.options.getString('nombre');

    try {
      //1.Comprobar si el usuario existe

      const user = getUser(discordId);

      if(!user) {
        return await interaction.reply(`${getUserMention(discordId)} tu usuario no existe`);
      }

      //.Borrar usuario
      const editStatement = `
    UPDATE users 
    SET name = ?
    WHERE user_id = ?
    `;
      db.prepare(editStatement).run(name, discordId);

      //3. Respuesta
      await interaction.reply(`${getUserMention(discordId)} tu usuario ha sido editado`);

    } catch (error) {
      console.log(error);
    }
  },
};




