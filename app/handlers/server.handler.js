const db  = require('../connection');
const joi = require('joi');

const getAll = (request, response) => {

    db.select().from('servers').timeout(1000, { cancel: true }).then((data) => {

        response({ status: 'ok', message: 'Servers successfully fetched!', data: data }); 

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
};

const getByID = (request, response) => {

        db.select().from('servers').where('id', request.params.id).then((data) => {

            response({ status: 'ok', message: 'Server successfully fetched!', data: data });

        }).catch((error) => {

            response({ status: 'error', message: 'Server side error!' })

        });
};

const addServer = (request, response) => {

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
};

const deleteServer = (request, response) => {
  
    db('servers').where('id', request.params.id).del().then(() => {

        response({ status: 'ok', message: 'Server successfully deleted!' }); 

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
};

const updateServer = (request, response) => {

    db.update(request.payload).into('servers').where('id', request.params.id).then(() => {

        response({ status: 'ok', message: 'Server successfully updated!' }); 

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
}

const schema = {
    server: joi.object().keys({
        id: joi
            .number()
            .required()
            .integer()
            .min(0)
            .description('id of the server')
            .example(1),
        ip: joi
            .string()
            .required()
            .description('ip adress of the server')
            .example('127.0.0.1'),
        hostname: joi
            .string()
            .required()
            .description('hostname adress of the server')
            .example('https://www.twitch.tv/'),
        token: joi
            .string()
            .required()
            .description('token for encryption')
            .example('3c469e9d6c5875d37a43f353d4f88e61fcf812c66eee3457465a40b0da4153e0'),
    })
}

module.exports = {
    getAll,
    getByID,
    addServer,
    updateServer,
    deleteServer,
    schema
}