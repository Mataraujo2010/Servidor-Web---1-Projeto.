const app = require('./app');

app.set('port', 4250);
const server = app.listen(app.get('port'),() => {
    console.log("Servidor Rodando na porta: "+server.address().port);
});
