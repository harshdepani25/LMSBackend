const { createServer } = require('node:http');
const { Server } = require('socket.io');

const createSocketIO = () => {
    try {
        const io = new Server({
            cors : {
                origin : "http://localhost:5174"
            }
        }); 

        io.on('connection', (socket) => {
            socket.emit("welcome", 'Welcome to our chat.')
            console.log('a user connected', socket.id);
        });


        io.listen(4000)

    } catch (error) {
        console.log(error);

    }
}

module.exports = createSocketIO;