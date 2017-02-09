import { serverRoutes } from './routes/server.route';
import { projectRoutes } from './routes/project.route';
import { eventRoutes } from './routes/event.route';

export const routes = [
    ...serverRoutes,
    ...projectRoutes,
    ...eventRoutes
 ];