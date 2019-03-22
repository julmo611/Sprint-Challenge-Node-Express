// important
const express = require('express');
const helmet = require('helmet');

const projectRoutes = require('./api/projectRouters');
const actionRoutes = require('./api/actionRouters');

const server = express();



server.use(express.json());
server.use(helmet());


server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);


module.exports = server;