const express = require('express');
const db = require('./infraestructure/mongoogse');
const routers = require('./api/routers');
const app = express();

app.use(express.json());
app.use(routers);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});