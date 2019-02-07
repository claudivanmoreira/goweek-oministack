
module.exports = {
    socketio (app, http) {
        const io = require('socket.io')(http);
        app.use((req, res, nextHandler) => {
            req.io = io;
            return nextHandler();
        });
    }
}