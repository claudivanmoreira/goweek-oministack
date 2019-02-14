const Tweet = require('../tweets/Tweet');

module.exports = {
    async save(req, res) {
        const tweet = await Tweet.findById(req.params.id);
        tweet.set({ likes: tweet.likes + 1 });
        await tweet.save();
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('Novo like: {_id:' + req.params.id + ', origem: ' + ip + '}');
        req.io.emit('like', tweet);
        return res.json(tweet);
    }
}