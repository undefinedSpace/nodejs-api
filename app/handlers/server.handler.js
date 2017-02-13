const db  = require('../connection');
const joi = require('joi');

const getAll = (request, reply) => {

    db.many('SELECT * FROM servers').then( data => {

        reply(data)

    }).catch( error => {

        reply(error).code(500)

    })

};

const getByID = (request, reply) => {

    db.one('SELECT * FROM servers WHERE id = $1', request.params.id).then( data => {

        reply(data)

    }).catch( error => {

        reply(error).code(500)

    })

};

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
    }).label('server'),

    get servers() {
        return joi
            .array()
            .items(this.server)
            .label('list_of_servers')
    }
}

module.exports = {
    getAll,
    getByID,
    schema
}