const express = require('express');
const loggerMiddleWare = require('morgan');
const corsMiddleWare = require('cors');
const { PORT } = require('./config/constants');
const authRouter = require('./routers/auth');
const challengeRouter = require('./routers/challenge');
const snippetRouter = require('./routers/snippet');
const http = require('http');
const Snippet = require('./models/').snippet;

const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

/**
 * Middlewares: DO NOT REGISTER ANY ROUTERS BEFORE THE MIDDLEWARES
 *
 * It is advisable to configure your middleware before configuring the routes
 * If you configure routes before the middleware, these routes will not use them
 *
 */

/**
 *
 * cors middleware:
 *
 * Since our api is hosted on a different domain than our client
 * we are are doing "Cross Origin Resource Sharing" (cors)
 * Cross origin resource sharing is disabled by express by default
 * for safety reasons (should everybody be able to use your api, I don't think so!)
 *
 * We are configuring cors to accept all incoming requests
 * If you want to limit this, you can look into "white listing" only certain domains
 *
 * docs: https://expressjs.com/en/resources/middleware/cors.html
 *
 */

app.use(corsMiddleWare());

/**
 * morgan:
 *
 * simple logging middleware so you can see
 * what happened to your request
 *
 * example:
 *
 * METHOD   PATH        STATUS  RESPONSE_TIME   - Content-Length
 *
 * GET      /           200     1.807 ms        - 15
 * POST     /echo       200     10.251 ms       - 26
 * POST     /puppies    404     1.027 ms        - 147
 *
 * github: https://github.com/expressjs/morgan
 *
 */

app.use(loggerMiddleWare('dev'));

/**
 *
 * express.json():
 * be able to read request bodies of JSON requests
 * a.k.a. body-parser
 * Needed to be able to POST / PUT / PATCH
 *
 * docs: https://expressjs.com/en/api.html#express.json
 *
 */

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 *
 * delay middleware
 *
 * Since our api and client run on the same machine in development mode
 * the request come in within milliseconds
 * To simulate normal network traffic this simple middleware delays
 * the incoming requests by 1500 second
 * This allows you to practice with showing loading spinners in the client
 *
 * - it's only used when you use npm run dev to start your app
 * - the delay time can be configured in the package.json
 */

if (process.env.DELAY) {
    app.use((req, res, next) => {
        setTimeout(() => next(), parseInt(process.env.DELAY));
    });
}

/**
 * Routes
 *
 * DEFINE YOUR ROUTES AFTER THIS MESSAGE (now that middlewares are configured)
 */

app.use('/', authRouter);
app.use('/challenges', challengeRouter);
app.use('/snippets', snippetRouter);

/**
 *
 * SOCKETS
 *
 */
const rooms = [];
const users = [];

io.on('connection', (socket) => {
    console.log('user ID ', socket.id);
    const id = socket.id;
    // socket.on('message-server', (_) => {
    //     io.emit('private', `hello ${id}`);
    // });

    // socket.on('message-secondChannel', (_) => {
    //     io.emit('second-channel', `hello ${id} second channel`);
    // });

    socket.on('join_room', (room) => {
        console.log('room  ', room);
        // We send the room and then join the socket to that rooms
        console.log('current ', rooms);
        if (!rooms.filter((room) => room.id === room).length > 0) {
            const newRoom = { id: room, users: [], messages: [] };
            newRoom.users.push(socket.id);
            rooms.push(newRoom);
            console.log('pushing new room ', newRoom);
        } else {
            rooms[room].users.push(socket.id);
        }
        socket.join(room);
        io.to(room).emit(
            'joined',
            rooms.find((room) => room.id === 'halo').messages
        );
    });

    socket.on('new_message', (data) => {
        rooms
            .find((room) => room.id === 'halo')
            .messages.push({ id: 1, message: data });
        io.to('halo').emit('newMessage', data);
    });

    socket.on('disconnect', (room) => {
        console.log('disconnecting ', socket.id);
    });
});

// Listen for connections on specified port (default is port 4000)
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
