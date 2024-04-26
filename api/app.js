// script.js
const { default: axios } = require('axios');
const CriadorXLSX = require('./file');
const cron = require('node-cron');

const criador = new CriadorXLSX();

async function getData() {
  await axios.get("http://easytasks.edm.co.mz/backend/public/api/actividades").then((res) => {
    const data = res.data;
    criador.adicionarDados(data);
    criador.criarXLSX();
  });
}

// Agendar a tarefa a cada 5 minutos
/*
cron.schedule('* * * * * *', async () => {
 // console.log('Executando a tarefa a cada 5 minutos.');
  await getData();
});
*/
cron.schedule('* * * * * *',() => {
 // console.log('Executando a tarefa a cada 5 minutos.');
  console.error("trying to connect..")
});
