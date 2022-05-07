const sockets = [];
let countPersons = 0;

const handleConnection = (socket, req) => {
    sockets.push(socket);
    socket['nickname'] = `${
        countPersons++ >= 100 ? (countPersons = 1) : countPersons
    }`;
    // sockets.forEach(a => {
    //     a.send(
    //         ` : ${socket.nickname}님이 입장하셨습니다. 현재 유저 ${sockets.length}명`
    //     );
    // });
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
    // socket.on('close', handleSocketClose);
};

const handleSocketClose = () => {
    sockets.forEach(a => {
        a.send(`유저 한명이 나갔습니다.`);
    });
};

module.exports = { handleConnection };
