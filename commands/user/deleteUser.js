const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');
const { getUserMention } = require('../../utils/discordUtils');
const { getUser } = require('../../utils/dbUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('borrar-usuario')
    .setDescription('Borra tu usuario!'),
  async execute(interaction) {
    const discordId = interaction.user.id;

    try {
      //1.Comprobar si el usuario existe

      const user = getUser(discordId);

      if(!user) {
        return await interaction.reply(`${getUserMention(discordId)} tu usuario no existe`);
      }

      //.Borrar usuario
      const deleteStatement = `
    DELETE FROM users 
    WHERE user_id = ?
    `;
      db.prepare(deleteStatement).run(discordId);

      //3. Respuesta
      await interaction.reply(`${getUserMention(discordId)} tu usuario ha sido eliminado`);

    } catch (error) {
      console.log(error);
    }
  },
};