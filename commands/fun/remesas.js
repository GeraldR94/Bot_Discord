const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

//conet api tasa paypal
const axios = require('axios');
const url = 'https://pydolarvenezuela-api.vercel.app/api/v1/dollar/';

let apidata = '';
let tasaPaypal = 0;
let tasaZinli = 0;
let tasaUsdt = 0;
let tasaGc = 0;
let tasaSkrill = 0;
let tasaUphold = 0;
let tasaBdv = 0;
let tasaMercantil = 0;
let tasaBanesco = 0;
let tasaBancamiga = 0;
let tasaBcv = 0;

//get axios url api
axios.get(url)
  .then(response => {
    apidata = response.data;
    tasaPaypal = apidata.monitors.paypal.price; // Tasa de cambio de PayPal a BS
    tasaZinli = (apidata.monitors.bancamiga.price * 0.95).toFixed(2); // Tasa de cambio de Zinli a BS // Tasa de cambio de Zinli a BS
    tasaUsdt = apidata.monitors.binance.price; // Tas
    tasaGc = apidata.monitors.amazon_gift_card.price;
    tasaSkrill = apidata.monitors.skrill.price;
    tasaUphold = apidata.monitors.uphold.price;
    tasaBdv = apidata.monitors.banco_de_venezuela.price;
    tasaMercantil = apidata.monitors.banco_mercantil.price;
    tasaBanesco = apidata.monitors.banesco.price;
    tasaBancamiga = apidata.monitors.bancamiga.price;
    tasaBcv = apidata.monitors.bcv.price;
  })
  .catch(error => {
    console.log(error);
  });



module.exports = {
  data: new SlashCommandBuilder()
    .setName('consultar-tasa')
    .setDescription('Conusulta la tasa del dia BCV, MonitorDollars, Paypal, etc')
    .addStringOption(option =>
      option
        .setName('tasa')
        .setDescription('Tasa a consultar (BCV, Monitor, Skrill, paypal, zinli, usdt)')
        .setRequired(true)
    ),

  async execute(interaction) {

    const tasa = interaction.options.getString('tasa');

    let resultado;
    let logo;
    let color;
    //if for tasa de cambio
    if (tasa === 'paypal') {
      resultado = tasaPaypal;
      logo = 'https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-0.png';
      color = '#0099ff';
    } else if (tasa === 'zinli') {
      resultado = tasaZinli;
      logo = 'https://www.netcoffee.com.ve/wp-content/uploads/2022/04/logo-zinli.png';
      color = '#00ff00';
    } else if (tasa === 'usdt') {
      resultado = tasaUsdt;
      logo = 'https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png';
      color = '#ffffff';
    } else if (tasa === 'gc') {
      resultado = tasaGc;
      logo = 'https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-0.png';
      color = '#f5d90a';
    } else if (tasa === 'skrill') {
      resultado = tasaSkrill;
      logo = 'https://logodownload.org/wp-content/uploads/2020/10/skrill-logo-0.png';
      color = '#ed0af5';
    } else if (tasa === 'uphold') {
      resultado = tasaUphold;
      logo = 'https://seeklogo.com/images/U/uphold-logo-C6BC13837F-seeklogo.com.png';
      color = '#0af51a';
    } else if (tasa === 'bdv') {
      resultado = tasaBdv;
      logo = 'https://as01.epimg.net/diarioas/imagenes/2021/05/17/actualidad/1621287095_937796_1621287161_noticia_normal_recorte1.jpg';
      color = '#f50e0a';
    } else if (tasa === 'mercantil') {
      resultado = tasaMercantil;
      logo = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Banco_Mercantil_Logo.png';
      color = '#0aabf5';
    } else if (tasa === 'banesco') {
      resultado = tasaBanesco;
      logo = 'http://blog.banesco.com/wp-content/uploads/2013/05/Logo-Banesco-horizontal-WEB-s-rif-800x312.jpg';
      color = '#0af50e';
    } else if (tasa === 'bancamiga') {
      resultado = tasaBancamiga;
      logo = 'https://cdn.elimpulso.com/media/2018/07/Sin-t%C3%ADtulo-1-696x467.jpg';
      color = '#41b314';
    } else if (tasa === 'bcv') {
      resultado = tasaBcv;
      logo = 'https://pedroapalma.com/site/wp-content/uploads/2016/12/bcv-logo-300x300.png';
      color = '#eff2ed';
    }
    //response enbed message add image for tasas
    const embed = new EmbedBuilder()
      .setTitle(`Tasa de cambio de ${tasa}`)
      .setDescription(`Consulta de tasa ${tasa}`)
      .setThumbnail('https://i.imgur.com/31GFdpG.jpg')
      .setColor(color)
      .addFields(
        { name: 'Resultado', value: `${resultado} ves`, inline: true },
      )
      .setImage(logo)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });

  }

};