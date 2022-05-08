const http = require('http');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const routes = require('./routes');
const cors = require('cors');

const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('data/uploads/review'));
app.use(routes);

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

const Server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        Server.listen(PORT, () =>
            console.log(`Server is listening on ${PORT}`)
        );
    } catch (err) {
        console.error(err);
        await prisma.$disconnect();
    }
};

start();

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: Server });

const sockets = [];
let countPersons = 1;

const handleConnection = socket => {
    console.log('Connected from Browser!');
    sockets.push(socket);
    socket['nickname'] = `Visitor ${countPersons++}`;
    socket.on('message', msg => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case 'new_message':
                sockets.forEach(a => {
                    if (a !== socket) {
                        a.send(`${socket.nickname}: ${message.payload}`);
                    }
                });
                break;
            case 'nickname':
                socket['nickname'] = message.payload;
                break;
            default:
        }
    });
    socket.on('close', handleSocketClose);
};

const handleSocketClose = () => {
    console.log('Disconnected from Browser!');
};

wss.on('connection', handleConnection);
wss.on('close', handleSocketClose);
