const serverRoutes  = require('./routes/server.route')
const syncRoutes    = require('./routes/sync.route')


const routes = [
    ...serverRoutes,
    ...syncRoutes
 ];

 module.exports = routes;