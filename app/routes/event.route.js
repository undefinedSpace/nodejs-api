const joi      = require('joi');
const handlers = require('../handlers');

const eventRoutes = [
    {
        method : 'GET',
        path : '/api/events',
        handler : handlers.event.getAll,
    },
    {
        method : 'GET',
        path : '/api/events/{id}',
        handler : handlers.event.getByID,
    }
];

module.exports = eventRoutes;