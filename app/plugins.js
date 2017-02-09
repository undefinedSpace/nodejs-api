const inert   = require('inert');
const vision  = require('vision');
const swagger = require('./plugins/swagger.plugin');

const plugins = [
    inert,
    vision,
    swagger
];

module.exports = plugins;