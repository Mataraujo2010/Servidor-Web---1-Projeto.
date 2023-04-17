const express = require("express");
const router = express.Router();
const fs = require('fs');

router.get("/", (req, res) => {
    res.sendFile(__dirname +'/View/index.html');
});

router.get("/sobre-nos", (req, res) => {
    res.sendFile(__dirname +'/View/sobre-nos.html');
});

router.get("/integrantes", (req, res) => {
    res.sendFile(__dirname +'/View/integrantes.html');
});

router.get("/santos", (req, res) => {
    res.sendFile(__dirname +'/View/santos.html');
});

router.get("/importancia", (req, res) => {
    res.sendFile(__dirname +'/View/importancia.html');
});

router.get("/entrada", (req, res) => {
    res.sendFile(__dirname +'/entrada/texto.md');
});

router.get('/links', (req, res) => {
    fs.readFile(__dirname + '/entrada/texto.md', 'utf8', (err, data) => {
     
      const regex = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      const links = data.match(regex);
  
      res.send('Estes são os Links encontrados no arquivo texto.md: '+ links);
    });
  });

  router.get('/validar', (req, res) => {
    fs.readFile(__dirname + '/entrada/texto.md', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(404).sendFile(__dirname + '/View/404.html');
      }

      if (data) {
        console.error(data);
        return res.status(200).send('O texto.md solicitado é válido');
      }

      if (!links) {
        return res.status(500).send('O Arquivo não apresenta link de URL');
      }


      const regex = /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      const links = data.match(regex);

      res.send('O arquivo inserido é válido');
    });
  });

router.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/View/404.html');
  });

const app = express();
app.use('/', router);

module.exports = app;