import express from 'express';
import bodyParser from 'body-parser';

const app = express();

let port = 8080;

// SETUP MIDDLEWARE
app.use(bodyParser.json());

// SERVE STATIC FILES - REACT PROJECT
app.use('/', express.static(__dirname + '/../../build'));

import api from './api'
app.use('/api',api);
// LOAD API FROM ROUTES
// TO BE IMPLEMENTED

app.listen(port, () => {
    console.log('Express is listening on port', port);
});