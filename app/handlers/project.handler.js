const db = require('../connection');
const joi = require('joi');

const getAll = (request, response) => {

    db.select().from('projects').timeout(1000, { cancel: true }).then((data) => {

        response(data); 

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
}

const getByID = (request, response) => {

        db.select().from('projects').where('id', request.params.id).then((data) => {

            response(data);

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
}

const addProject = (request, response) => {

    let project = [{
        id_folder : request.payload.id_folder,
        id_server : request.payload.id_server,
        path : request.payload.path,
        time_start : request.payload.time_start,
        time_stop : request.payload.time_stop
    }];

    db.insert(server).into('projects').then(() => {

        response({ status: 'ok', message: 'Project successfully added!' }); 

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
}

const deleteProject = (request, response) => {

    db('projects').where('id', request.params.id).del().then(() => {

        response({ status: 'ok', message: 'Project successfully deleted!' }); 

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
}

const updateProject = (request, response) => {

    db.update(request.payload).into('projects').where('id', request.params.id).then(() => {

        response({ status: 'ok', message: 'Project successfully updated!' }); 

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
}

const schema = {
    project: joi.object().keys({
        id: joi
            .number()
            .required()
            .integer()
            .min(0)
            .description('id of the project')
            .example(1),
        id_folder: joi
            .number()
            .required()
            .integer()
            .min(0)
            .description('id of the folder')
            .example(1),
        id_server: joi
            .number()
            .required()
            .integer()
            .min(0)
            .description('id of the server')
            .example(1),
        path: joi
            .string()
            .required()
            .description('path for project')
            .example('/home/usr/dev/versions'),
        time_start: joi
            .date()
            .required()
            .description('unix timestamp of project start time')
            .example('2017-02-10 01:08:03'),
        time_stop: joi 
            .date()
            .required()
            .description('unix timestamp of project stop time')
            .example('2017-02-10 02:01:23')
    }).label('project'),

    get projects() {
        return joi
            .array()
            .items(this.project)
            .label('list_of_projects')
    }
}

module.exports = {
    getAll,
    getByID,
    addProject,
    updateProject,
    deleteProject,
    schema
}