const db = require('../connection');
const joi = require('joi');

const getAll = (request, response) => {

    db.select().from('events').timeout(1000, { cancel: true }).then((data) => {

        response(data); 

    }).catch((error) => {

        console.error(error)
        response({ status: 'error', message: 'Server side error!', error: error })

    });
}

const getByID = (request, response) => {

    db.select().from('events').where('id', request.params.id).then((data) => {

        response({data});

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
}

const schema = {
    event: joi.object().keys({
        id: joi
            .number()
            .required()
            .integer()
            .min(0)
            .description('id of the event')
            .example(1),
        description: joi
            .string()
            .required()
            .description('description of the event')
            .example('IS_EMPTY')
    }).label('event'),
    
    get events() {
        return joi
            .array()
            .items(this.event)
            .label('list_of_events')
    }
}

module.exports = {
    getAll,
    getByID,
    schema
}