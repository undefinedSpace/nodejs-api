import { serverRoutes } from './routes/server.route';
import { projectRoutes } from './routes/project.route';

export const routes = [
    ...serverRoutes,
    ...projectRoutes
 ];