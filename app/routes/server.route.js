const joi      = require('joi');
const handlers = require('../handlers');

const serverRoutes = [
    {
        method  : 'GET',
        path    : '/api/servers',
        handler : handlers.server.getAll,
        config  : {
            tags        : ['api'], 
            description : 'Get all Servers data',
            response    : {
                schema : handlers.server.schema.servers
            }
        }
    },
        {
        method  : 'GET',
        path    : '/api/servers/{id}',
        handler : handlers.server.getByID,
        config  : {
            tags        : ['api'], 
            description : 'Get server data by ID',
            response : {
                schema : handlers.server.schema.server
            }
        }
    },
    {
        method  : 'POST',
        path    : '/api/servers',
        handler : handlers.server.addServer,
        config  : {           
            validate : {
                payload : {
                    ip       : joi.string().required(),
                    hostname : joi.string().required(),
                    token    : joi.string().required()
                }
            },
            tags        : ['api'], 
            description : 'Post server data to database'
        }
    },
    {
        method  : 'PUT',
        path    : '/api/servers/{id}',
        handler : handlers.server.updateServer,
        config  : {
            tags        : ['api'], 
            description : 'Put data to database for update server'
        }
    },
    {
        method  : 'DELETE',
        path    : '/api/servers/{id}',
        handler : handlers.server.deleteServer,
        config  : {
            tags        : ['api'], 
            description : 'Delete server data from database'
        }
    }
];

module.exports = serverRoutes;