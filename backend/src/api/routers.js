const routers = require('express').Router();
const LikeController = require('./likes/LikeController');
const TwitterController = require('./tweets/TweetController');

/* Rotas para a api de tweet */
routers.get('/tweets/', TwitterController.findAll);
routers.post('/tweets/', TwitterController.save);

/* Rotas para a api de like */
routers.post('/likes/:id', LikeController.save);

module.exports = routers;