const pack = require('../../package.json');

const swagger = { 
    register : require('hapi-swagger'), 
    options: { 
        info: {
            title: 'undefinedSpace API Documentation',
            description: 'api docs gg wp',
            version: pack.version,
            contact: {
                name: pack.author,
                url: 'https://github.com/Laapi'
            },
            license: {
                name: pack.license
            }
        },
        documentationPath: '/',
        jsonEditor: true, 
        pathPrefixSize: 2,
        basePath: '/api/'
    }
};

module.exports = swagger;