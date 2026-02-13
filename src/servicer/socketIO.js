const { log } = require('node:console');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const createSocketIO = () => {
    try {
        const io = new Server({
            cors: {
                origin: "http://localhost:5173"
            }
        });

        io.on('connection', (socket) => {
            socket.emit("welcome", 'Welcome to our chat.')
            console.log('a user connected', socket.id);

            socket.on("userMSG:", ({msg, totheid}) => {
                console.log("msg: ", msg);
                console.log("id: ", totheid);
                
                io.to(totheid).emit("resevier-msg", msg)
            });

            socket.on("Group", (group) => {
                socket.join(group)
            })

        });
       
        io.listen(4000)

    } catch (error) {
        console.log(error);

    }
}

module.exports = createSocketIO;