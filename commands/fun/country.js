const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const createEmbed = ({ country, weather }) => {
  const exampleEmbed = new EmbedBuilder()
    // .setColor(0x0099FF)
    .setTitle(country.name.common)
    .setURL(`https://es.wikipedia.org/wiki/${country.translations.spa.common}`)
    .setDescription('Muestra informacion del pais')
    .setThumbnail(`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
    .addFields(
      { name: 'Capital', value: `${country.capital[0]}`, inline: true },
      { name: 'Poblacion', value: `${country.population}`, inline: true },
      { name: 'Region', value: `${country.region}`, inline: true },
    )
    .addFields(
      { name: 'Capital', value: `${country.capital[0]}`, inline: true },
      { name: 'Poblacion', value: `${country.population}`, inline: true },
      { name: 'Region', value: `${country.region}`, inline: true },
    )
    .setImage(country.flags.png);
  return exampleEmbed;
};


module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-pais')
    .setDescription('Busca un pais de tu preferencia!')
    .addStringOption(option =>
      option
        .setName('pais')
        .setDescription('Pais a buscar')
        .setRequired(true)
    )

  ,
  async execute(interaction) {
    try {
      const country = interaction.options.getString('pais');
      const { data: countryInfo } = await axios.get(`https://restcountries.com/v3.1/name/${country}`);

      const latitud = countryInfo[0].latlng[0];
      const longitud = countryInfo[0].latlng[1];

      const { data: weather } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=ccd47940cdd6cfbad918a9aa0d9cc3af&units=metric`);

      console.log(countryInfo);

      const embed = createEmbed({ country: countryInfo[0], weather });
      await interaction.reply({ embeds: [embed ] });

    } catch (error) {
      await interaction.reply('Ese pais no existe!');
      console.log(error);
    }
  },
};
