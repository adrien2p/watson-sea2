'use strict';

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import compression from 'compression';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';

import globalConfig from './config/global';

import socketManagerService from './service/socketManagerService';
import speechToTextService from './service/speechToTextService';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const port = globalConfig.port;

app.set('view engine', 'html');

app.use(compression({}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '..', 'dist')));

/* Setup sockets */
io.on('connection', (socket) => socketManagerService.init(socket));

/* Set route for special needed (async speech to text for example) */

app.get('/stt-callback-results', (req, res) => {

});
app.get('/stt-callback-results-secure', (req, res) => res.send(speechToTextService.userSecretSha1));

/* Catch all get and return index.html */
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html')));

/* Server start */
server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});