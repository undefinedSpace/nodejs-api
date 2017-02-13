const joi      = require('joi')
const handlers = require('../handlers')

const syncRoutes = [
    {
        method  : 'POST',
        path    : '/api/sync',
        handler : handlers.sync.InitProject,
        config: {
            tags        : ['api'], 
            description : 'Initialize project on database'
        }
    }
];

module.exports = syncRoutes;