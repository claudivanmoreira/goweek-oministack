const Tweet = require('./Tweet');

module.exports = {
    async findAll(req, res) {
        const tweets = await Tweet.find({}).sort('-createdAt');
        return res.json(tweets);
    },
    async save(req, res) {
        const tweet = await Tweet.create(req.body);
        req.io.emit('tweet', tweet);
        return res.json(tweet);
    }
}