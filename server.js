import hapi       from 'hapi';
import { routes } from './app/routes';

const server = new hapi.Server();

server.connection({
    host: 'localhost',
    port: 8080
});

console.log(routes);

server.route(routes);

server.start(error => {
    if(error) throw error
    console.log(`Server started on ${ server.info.uri }`);
});