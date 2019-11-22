const axios = require("axios");
const TotalVoice = require("totalvoice-node");
require("dotenv").config();

const client = new TotalVoice(process.env.TOTAL_VOICE_TOKEN);

const servers = [
  {
    name: "Servidor 1",
    url: "http://localhost:4001",
    engineer: {
      name: "Vinicius Serpa",
      phone: process.env.MY_PHONE_NUMBER
    }
  },
  {
    name: "Servidor 2",
    url: "http://localhost:4002",
    engineer: {
      name: "Vinicius Serpa",
      phone: process.env.MY_PHONE_NUMBER
    }
  }
];

// setInterval(async function() {
(async function() {
  console.log("#");
  for (const server of servers) {
    await axios({
      url: server.url,
      method: "get"
    })
      .then(response => {
        console.log(`${server.name} está online`);
      })
      .catch(() => {
        console.log(`${server.name} está offline`);
        const message = `${server.engineer.name} o ${server.name} está offline, por favor faça alguma coisa o mais rápido possível`;
        const options = {
          velocidade: 2,
          tipo_voz: "br-Vitoria"
        };

        client.tts
          .enviar(server.engineer.phone, message, options)
          .then(() => {
            console.log(`O engenheiro ${server.engineer.name} já foi avisado`);
          })
          .catch(() => {
            console.log("Algo deu errado durante a execução do envio do tts");
          });
      });
  }
  console.log("#");
})();
// }, 1000);
