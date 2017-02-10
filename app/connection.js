const knex = require('knex');

const env = process.env.NODE_ENV;
const databases = {

    production: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'rootx',
            database : 'versions_db_prod'
        }
    },

    development: {
        client: 'mysql',
        connection: {
            host : 'http://194.87.92.115/',
            user : 'laapi',
            password : '666666',
            database : 'versions_db_dev'
        }
    },

    test: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'rootx',
            database : 'versions_db_test'
        }
    }
};

const db = knex(databases[env]);

module.exports = db;