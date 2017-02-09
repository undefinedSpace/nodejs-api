import hapi       from 'hapi';
import { routes } from './app/routes';

const server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: 8080
});

server.route(routes);

server.start(error => {
    if(error) throw error
});

module.exports = server;