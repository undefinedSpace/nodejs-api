import joi from 'joi';
import {serverController} from './controllers/server.controller';

export const routes = [
    /**
     * Server routes
     */
    {
        method : 'GET',
        path : '/api/servers',
        handler : serverController.getAll,
    },
        {
        method : 'GET',
        path : '/api/servers/{id}',
        handler : serverController.getByID,
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
                }
            } 
        }
    },
    {
        method : 'PUT',
        path : '/api/servers/{id}',
        handler : serverController.updateServer
    }
];
