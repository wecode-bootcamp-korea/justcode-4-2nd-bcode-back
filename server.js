const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const routes = require('./routes');
const chatService = require('./services/chatService');
const PORT = process.env.PORT;

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
const wss = new WebSocket.Server({ server: Server });

const start = async () => {
    try {
        Server.listen(PORT, () =>
            console.log(`Server is listening on ${PORT}`)
        );

        wss.on('connection', chatService.handleConnection);
    } catch (err) {
        console.error(err);
        await prisma.$disconnect();
    }
};

start();
