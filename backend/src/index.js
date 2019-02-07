const express = require('express');
const app = express();
const db = require('./infraestructure/db/mongoogse');
const routers = require('./api/routers');
const http = require('http').Server(app);
const socketio = require('./middlewares/socketio').socketio(app, http);
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routers);

http.listen(3000, () => {
    console.log('Server started on port 3000');
});