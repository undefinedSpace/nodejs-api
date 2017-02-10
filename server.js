const hapi    = require('hapi')
const plugins = require('./app/plugins')
const routes  = require('./app/routes')

const server = new hapi.Server();

server.connection({
    host: '127.0.0.1',
    port: 8080
});

server.route(routes);

server.register(plugins, (error) => {
    if (error) console.log('Failed to load plugin:', error)
})

server.start(error => {
    if (error) console.error('Failed to start server:', error);
        console.log('Server started on:', server.info.uri);
});

module.exports = server;