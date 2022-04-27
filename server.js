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

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        server.listen(PORT, () =>
            console.log(`Server is listening on ${PORT}`)
        );
    } catch (err) {
        console.error(err);
        await prisma.$disconnect();
    }
};

start();
