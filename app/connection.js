import knex from 'knex';

const env = process.env.NODE_ENV;
const databases = {

    production: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : '66666666',
            database : 'versions_db_prod'
        }
    },

    development: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : '66666666',
            database : 'versions_db_dev'
        }
    },

    test: {
        client: 'mysql',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : '66666666',
            database : 'versions_db_test'
        }
    }
};

export const db = knex(databases[env]);