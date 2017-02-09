import { db } from '../connection'

export const serverController = {

    getAll: (request, response) => {

        db.select().from('servers').timeout(1000, { cancel: true }).then((data) => {

            response({ status: 'ok', message: 'Servers successfully fetched!', data: data }); 

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
    },

    getByID: (request, response) => {

            db.select().from('servers').where('id', request.params.id).then((data) => {

                response({ status: 'ok', message: 'Server successfully fetched!', data: data });

            }).catch((error) => {

                response({ status: 'error', message: 'Server side error!' })

            });
    },

    addServer: (request, response) => {

        let server = [{
            ip : request.payload.ip,
            hostname : request.payload.hostname,
            token : request.payload.token
        }];
    
        db.insert(server).into('servers').then(() => {

            response({ status: 'ok', message: 'Server successfully added!' }); 

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
    },

    deleteServer: (request, response) => {
  
        db('servers').where('id', request.params.id).del().then(() => {

            response({ status: 'ok', message: 'Server successfully deleted!' }); 

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
    },

    updateServer: (request, response) => {

        db.update(request.payload).into('servers').where('id', request.params.id).then(() => {

            response({ status: 'ok', message: 'Server successfully updated!' }); 

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
    }
};
