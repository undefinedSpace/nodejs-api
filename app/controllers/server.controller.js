import {db} from '../connection'

export const serverController = {
    getAll: (request, response) => {
        response(db.select().from('servers').timeout(1000, { cancel: true }));
    },
    getByID: (request, response) => {
            let data = db.select().from('servers').where('id', request.params.id);

            console.log(data);
            response(data);           
    },
    addServer: (request, response) => {

        let server = {
            ip : request.params.ip,
            hostname : request.params.hostname,
            token : request.params.token
        };

        db.insert(server).into('servers');
    }
};
