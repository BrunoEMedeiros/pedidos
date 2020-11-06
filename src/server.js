const express = require('express');
const utils = require('./utils');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(utils.asyncverifyJWT);
app.use(express.json());
app.use(routes);

app.listen(3333);
