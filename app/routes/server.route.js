import joi from 'joi';
import { serverController } from '../controllers/server.controller';

export const serverRoutes = [
    {
        method : 'GET',
        path : '/api/servers',
        handler : serverController.getAll,
        config : {
            tags: ['api'], 
            description: 'Get All Servers data', 
            notes: 'Get All Servers data'
        }
    },
        {
        method : 'GET',
        path : '/api/servers/{id}',
        handler : serverController.getByID,
        config : {
            tags: ['api'], 
            description: 'Get Server data by ID', 
            notes: 'Get Server data by ID'
        }
    },
    {
        method : 'POST',
        path : '/api/servers',
        handler : serverController.addServer,
        config : {           
            validate : {
                payload : {
                    ip : joi.string().required(),
                    hostname : joi.string().required(),
                    token : joi.string().required()
                },
            tags: ['api'], 
            description: 'Post Server data to database', 
            notes: 'Post server data to database'
            } 
        }
    },
    {
        method : 'PUT',
        path : '/api/servers/{id}',
        handler : serverController.updateServer,
        tags: ['api'], 
        description: 'Put data to database for update Server', 
        notes: 'Put data to database for update Server'
    },
    {
        method : 'DELETE',
        path : '/api/servers/{id}',
        handler : serverController.deleteServer,
        tags: ['api'], 
        description: 'Delete Server data from database', 
        notes: 'Delete Server data from database'
    }
];