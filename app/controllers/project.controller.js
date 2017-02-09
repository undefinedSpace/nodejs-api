import { db } from '../connection'

export const projectController = {

    getAll: (request, response) => {

        db.select().from('projects').timeout(1000, { cancel: true }).then((data) => {

            response({ status: 'ok', message: 'Projects successfully fetched!', data: data }); 

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
    },

    getByID: (request, response) => {

            db.select().from('projects').where('id', request.params.id).then((data) => {

                response({ status: 'ok', message: 'Projects successfully fetched!', data: data });

            }).catch((error) => {

                response({ status: 'error', message: 'Server side error!' })

            });
    },

    addProject: (request, response) => {

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
    },

    deleteProject: (request, response) => {
  
        db('projects').where('id', request.params.id).del().then(() => {

            response({ status: 'ok', message: 'Project successfully deleted!' }); 

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
    },

    updateProject: (request, response) => {

        db.update(request.payload).into('projects').where('id', request.params.id).then(() => {

            response({ status: 'ok', message: 'Project successfully updated!' }); 

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
    }
};
