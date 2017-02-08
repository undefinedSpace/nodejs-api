import {db} from '../connection'

export const serverController = {
    getAll: (request, response) => {
        response(db.select().from('servers').timeout(1000, { cancel: true }));
    },
    getByID: (request, response) => {
            let data = db.select().from('servers').where('id', request.params.id);
            response(data); 
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
    }
};
