import joi from 'joi';
import { projectController } from '../controllers/project.controller';

export const projectRoutes = [
    {
        method : 'GET',
        path : '/api/projects',
        handler : projectController.getAll,
    },
        {
        method : 'GET',
        path : '/api/projects/{id}',
        handler : projectController.getByID,
    },
    {
        method : 'POST',
        path : '/api/projects',
        handler : projectController.addProject,
        config : {           
            validate : {
                payload : {
                    id_folder : joi.string().required(),
                    id_server : joi.string().required(),
                    path : joi.string().required(),
                    time_start : joi.string().required(),
                    time_stop : joi.string().required()
                }
            } 
        }
    },
    {
        method : 'PUT',
        path : '/api/projects/{id}',
        handler : projectController.updateProject
    },
    {
        method : 'DELETE',
        path : '/api/projects/{id}',
        handler : projectController.deleteProject
    }
];