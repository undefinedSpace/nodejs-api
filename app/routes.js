const serverRoutes  = require('./routes/server.route');
const projectRoutes = require('./routes/project.route');
const eventRoutes   = require('./routes/event.route');

const routes = [
    ...serverRoutes,
    ...projectRoutes,
    ...eventRoutes
 ];

 module.exports = routes;