import hapi        from 'hapi';
import { plugins } from './app/plugins'
import { routes }  from './app/routes';

const server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: 8080
});

console.log(plugins);

server.register(plugins, (error) => {
    if (error) {
        console.error('Failed to load a plugin:', err);
    }
});

server.route(routes);

server.start(error => {
    if(error) console.error('Failed to start server:', error);
        console.log('Server started on:', server.info.uri);
});

module.exports = server;