const joi      = require('joi');
const handlers = require('../handlers');

const serverRoutes = [
    {
        method  : 'GET',
        path    : '/api/servers',
        handler : handlers.server.getAll,
        config: {
            tags        : ['api'], 
            description : 'Get all servers from database'
        }
    },
    {
        method  : 'GET',
        path    : '/api/servers/{id}',
        handler : handlers.server.getByID,
        config  : {
            tags        : ['api'], 
            description : 'Get server from database',
        }
    }
];

module.exports = serverRoutes;