const { SlashCommandBuilder, MessageEmbed } = require('discord.js');
const axios = require('axios'); // Asegúrate de importar axios


module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-personaje')
    .setDescription('Busca un personaje de Rick and Morty')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Nombre del personaje')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const nombrePersonaje = interaction.options.getString('nombre');
      const response = await axios.get(`https://rickandmortyapi.com/api/character?name=${nombrePersonaje}`);
      const personajes = response.data.results;

      if (personajes.length === 0) {
        await interaction.reply('No se encontraron resultados para ese personaje.');
      } else {
        const personaje = personajes[0];

        const embed = new MessageEmbed()
          .setColor(0x0099FF)
          .setTitle(personaje.name)
          .setDescription('Información del personaje')
          .setThumbnail(personaje.image)
          .addFields(
            { name: 'Especie', value: personaje.species, inline: true },
            { name: 'Género', value: personaje.gender, inline: true },
            { name: 'Origen', value: personaje.origin.name, inline: true },
          );

        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      await interaction.reply('Hubo un error al buscar el personaje.');
      console.error(error);
    }
  },
};
