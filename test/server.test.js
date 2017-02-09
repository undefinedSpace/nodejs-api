const server   = require('../server');
const chai     = require('chai');
const chaihttp = require('chai-http');

const should = chai.should();

chai.use(chaihttp);

describe('Server API Tests:', () => {
    describe('/GET : All Servers', () => {
        it('return: status code 200, json, array', (done) => {
            chai.request(server.listener)
                .get('/api/servers')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.data.should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET : Server by ID', () => {
        it('return: status code 200, json, array, body.data: length = 4(id,ip,hostname,token)', (done) => {
            chai.request(server.listener)
                .get('/api/servers/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.data.should.be.a('array');
                    response.body.data[0].should.have.property('id');
                    response.body.data[0].should.have.property('ip');
                    response.body.data[0].should.have.property('hostname');
                    response.body.data[0].should.have.property('token');
                    done();
                });
        });
    });
    describe('/POST : Add server', () => {
        it('return: status code 200, json, array, message : Server successfully added!', (done) => {
            chai.request(server.listener)
                .post('/api/servers')
                .send({
                    ip: '127.0.0.1',
                    hostname: 'https://chai.io/',
                    token: '123456qwerty'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.message.should.equal('Server successfully added!');
                    done();
                });
        });
    });
    describe('/PUT : Update server', () => {
        it('return: status code 200, json, array, message : Server successfully updated!', (done) => {
            chai.request(server.listener)
                .put('/api/servers/2')
                .send({
                    ip: '0.0.0.0',
                    hostname: 'https://mocha.io/',
                    token: 'qwerty123456'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.message.should.equal('Server successfully updated!');
                    response.body.data[0].should.have.property('id');
                    response.body.data[0].should.have.property('ip');
                    response.body.data[0].should.have.property('hostname');
                    response.body.data[0].should.have.property('token');
                    response.body.data[0].id.should.equal(2);
                    response.body.data[0].ip.should.equal('0.0.0.0');
                    response.body.data[0].hostname.should.equal('https://mocha.io/');
                    response.body.data[0].token.should.equal('qwerty123456');
                    done();
                });
        });
    });
    describe('/DELETE : Delete server', () => {
        it('return: status code 200, json, array, message : Server successfully deleted!', (done) => {
            chai.request(server.listener)
                .delete('/api/servers/2')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.message.should.equal('Server successfully deleted!');
                    done();
                });
        });
    });
});