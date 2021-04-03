const path = require('path');
const express = require('express');
const routes = require('./routes');

require('./app/database');

const app = express();

app.use(express.json());

app.use(
  '/attachments',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
)

app.use(routes);

app.listen(3000);
