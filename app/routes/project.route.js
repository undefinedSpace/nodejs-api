const joi      = require('joi');
const handlers = require('../handlers');

const projectRoutes = [
    {
        method : 'GET',
        path : '/api/projects',
        handler : handlers.project.getAll,
    },
        {
        method : 'GET',
        path : '/api/projects/{id}',
        handler : handlers.project.getByID,
    },
    {
        method : 'POST',
        path : '/api/projects',
        handler : handlers.project.addProject,
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
        handler : handlers.project.updateProject
    },
    {
        method : 'DELETE',
        path : '/api/projects/{id}',
        handler : handlers.project.deleteProject
    }
];

module.exports = projectRoutes;