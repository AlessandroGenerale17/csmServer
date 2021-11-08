const express = require('express');
const loggerMiddleWare = require('morgan');
const corsMiddleWare = require('cors');
const { PORT } = require('./config/constants');
const http = require('http');
const authRouter = require('./routers/auth');
const challengeRouter = require('./routers/challenge');
const snippetRouter = require('./routers/snippet');
const languageRouter = require('./routers/language');
const homeRouter = require('./routers/home');
const likeRouter = require('./routers/like');
const commentRouter = require('./routers/comment');
const {
    findRoom,
    createRoom,
    isRoomAlive,
    removeUserFromRoom,
    addMessageToRoom,
    removeRoom
} = require('./sockets/index');

const app = express();

const server = http.createServer(app);
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
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});
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

const socketMiddleware = (req, res, next) => {
    req.io = io;
    next();
};

app.use('/', authRouter);
app.use('/challenges', challengeRouter);
app.use('/snippets', socketMiddleware, snippetRouter);
app.use('/languages', languageRouter);
app.use('/home', homeRouter);
app.use('/likes', likeRouter);
app.use('/comments', commentRouter);

/*
 * SOCKETS
 */
io.on('connection', (socket) => {
    console.log('USER  ID ', socket.id);

    socket.on('join_room', ({ roomId, user }) => {
        console.log('REQUEST TO JOIN ROOM ', roomId);

        // does the current room exist ?
        const room = isRoomAlive(roomId)
            ? findRoom(roomId)
            : createRoom(roomId);

        room.users.push(user);

        socket.join(roomId);
        console.log('sending messages ', room.messages);
        console.log('users active ', room.users);
        io.to(room.id).emit('joined_room', room.messages);
    });

    socket.on('leave_room', ({ roomId, user }) => {
        console.log('REQUEST TO LEAVE ROOM', roomId);
        removeUserFromRoom(roomId, user.id);

        const room = findRoom(roomId);
        if (room.users.length === 0) {
            console.log('deleting room');
            removeRoom(roomId);
        } else io.to(roomId).emit('left', user);
    });

    socket.on('new_message', ({ roomId, user, text }) => {
        addMessageToRoom(roomId, user, text);
        io.to(roomId).emit('new_message', { user: user, text: text });
    });

    socket.on('terminate_session', ({ roomId }) => {
        removeRoom(roomId);
        io.to(roomId).emit('terminate_session');
    });
});

// Listen for connections on specified port (default is port 4000)
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
