const joi      = require('joi');
const handlers = require('../handlers');

const eventRoutes = [
    {
        method  : 'GET',
        path    : '/api/events',
        handler : handlers.event.getAll,
        config: {
            tags        : ['api'], 
            description : 'Get all events from database', 
            response: { 
                schema : handlers.event.schema.events
            }
        }
    },
    {
        method  : 'GET',
        path    : '/api/events/{id}',
        handler : handlers.event.getByID,
        config  : {
            tags        : ['api'], 
            description : 'Get event from database',
        }
    }
];

module.exports = eventRoutes;