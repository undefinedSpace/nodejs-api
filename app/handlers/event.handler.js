const db = require('../connection');

const getAll = (request, response) => {

    db.select().from('events').timeout(1000, { cancel: true }).then((data) => {

        response({ status: 'ok', message: 'Events successfully fetched!', data: data }); 

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
}

const getByID = (request, response) => {

    db.select().from('events').where('id', request.params.id).then((data) => {

        response({ status: 'ok', message: 'Event successfully fetched!', data: data });

    }).catch((error) => {

        response({ status: 'error', message: 'Server side error!' })

    });
}

module.exports = {
    getAll,
    getByID
}