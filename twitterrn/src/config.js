
const appConfig = {
    apiBaseURL: 'http://192.168.42.234:3000',
    apiRouters: {
        tweets: 'tweets',
        likes: 'likes'
    },
    socketIO: {
        endPoint: 'http://192.168.42.234:3000',
        queeTweets: 'tweet',
        queeLikes: 'like'
    },
    localStorageKeyUsername: '@OminiStack:username'
}

export default appConfig;