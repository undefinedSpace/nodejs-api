var pgp = require('pg-promise')();

const env = process.env.NODE_ENV;

const databases = {

    production: {
        host: 'localhost',
        port: 5432,
        database: 'versions_db_prod',
        user: 'nikolajulasevic',
        password: '666666'
    },

    development: {
        host: 'localhost',
        port: 5432,
        database: 'versions_db_dev',
        user: 'nikolajulasevic',
        password: '666666'
    },

    test: {
        host: 'localhost',
        port: 5432,
        database: 'versions_db_test',
        user: 'nikolajulasevic',
        password: '666666'
    }
};

const db = pgp(databases[env]);

module.exports = db;