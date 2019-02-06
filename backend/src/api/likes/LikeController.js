const Tweet = require('../tweets/Tweet');

module.exports = {
    async save(req, res) {
        const tweet = await Tweet.findById(req.params.id);
        tweet.set({ likes: tweet.likes + 1 });
        await tweet.save();
        return res.json(tweet);
    }
}