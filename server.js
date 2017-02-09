import hapi        from 'hapi';
import { plugins } from './app/plugins'
import { routes }  from './app/routes';

const server = new hapi.Server();

server.connection({
    host: 'localhost',
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