import express from 'express';
import bodyParser from 'body-parser';
import { setResponseHeader } from './common/util';

const session = require('express-session'), RedisStore = require('connect-redis')(session);

const app = express();

let port = 8080;

/*REDIS-SESSION SETTING*/
app.use( session({
        store : new RedisStore({host : '127.0.0.1',port : 6379}),
        key : 'passport_session',
        secret : 'milan',
        cookie : { maxAge: 2419200000 }, // configure when sessions expires
        saveUninitialized: true, // saved new sessions
        resave: false, // do not automatically write to the session store
    })
);

// SETUP MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// SERVE STATIC FILES - REACT PROJECT
app.use('/', express.static(__dirname + '/../../build'));


import api from './api'
app.use('/api',setResponseHeader, api);
// LOAD API FROM ROUTES
// TO BE IMPLEMENTED

app.listen(port, () => {
    console.log('Express is listening on port', port);
});
