import pack from '../../package'

export const swaggerPlugin = { 
    register : require('hapi-swagger'), 
    options: { 
        info: {
            title: 'undefinedSpace API Documentation',
            description: 'api docs gg wp',
            version: pack.version,
            contact: {
                name: 'Mikalai Ulasevich',
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