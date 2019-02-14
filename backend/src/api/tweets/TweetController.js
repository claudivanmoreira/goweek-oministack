const Tweet = require('./Tweet');

module.exports = {
    async findAll(req, res) {
        const tweets = await Tweet.find({}).sort('-createdAt');
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('Listando tweets: { origem: ' + ip + '}');
        return res.json(tweets);
    },
    async save(req, res) {
        const tweet = await Tweet.create(req.body);
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('Criando tweet: { origem: ' + ip + '}');
        req.io.emit('tweet', tweet);
        return res.json(tweet);
    }
}