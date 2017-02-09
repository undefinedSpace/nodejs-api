import joi from 'joi';
import { eventController } from '../controllers/event.controller';

export const eventRoutes = [
    {
        method : 'GET',
        path : '/api/events',
        handler : eventController.getAll,
    },
    {
        method : 'GET',
        path : '/api/events/{id}',
        handler : eventController.getByID,
    }
];