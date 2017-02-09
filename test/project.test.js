const server   = require('../server');
const chai     = require('chai');
const chaihttp = require('chai-http');

const should = chai.should();

chai.use(chaihttp);

describe('Project API Tests:', () => {
    describe('/GET : All Projects', () => {
        it('return: status code 200, json, array', (done) => {
            chai.request(server.listener)
                .get('/api/projects')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.data.should.be.a('array');
                    done();
                });
        });
    });
    
    describe('/GET : Project by ID', () => {
        it('return: status code 200, json, array, body.data: length = 6(id,id_folder,id_server,path,time_start,time_stop)', (done) => {
            chai.request(server.listener)
                .get('/api/projects/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.data.should.be.a('array');
                    response.body.data[0].should.have.property('id');
                    response.body.data[0].should.have.property('id_folder');
                    response.body.data[0].should.have.property('id_server');
                    response.body.data[0].should.have.property('path');
                    response.body.data[0].should.have.property('time_start');
                    response.body.data[0].should.have.property('time_stop');
                    done();
                });
        });
    });

    describe('/POST : Add project', () => {
        it('return: status code 200, json, array, message : Project successfully added!', (done) => {
            chai.request(server.listener)
                .post('/api/projects')
                .send({
                    id_folder: 1,
                    id_server: 1,
                    path: 'home/usr/dev',
                    time_start: '2017-02-09 17:16:31',
                    time_stop: '2017-02-09 17:16:38'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.message.should.equal('Project successfully added!');
                    done();
                });
        });
    });

    describe('/PUT : Update project', () => {
        it('return: status code 200, json, array, message : Project successfully updated!', (done) => {
            chai.request(server.listener)
                .put('/api/projects/2')
                .send({
                    id_folder: 2,
                    id_server: 2,
                    path: 'home/usr/dev/null',
                    time_start: '2017-02-09 17:16:28',
                    time_stop: '2017-02-09 17:16:35'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.message.should.equal('Project successfully updated!');
                    response.body.data[0].should.have.property('id');
                    response.body.data[0].should.have.property('id_folder');
                    response.body.data[0].should.have.property('id_server');
                    response.body.data[0].should.have.property('path');
                    response.body.data[0].should.have.property('time_start');
                    response.body.data[0].should.have.property('time_stop');
                    response.body.data[0].id.should.equal(2);
                    response.body.data[0].id_folder.should.equal(2);
                    response.body.data[0].id_server.should.equal(2);
                    response.body.data[0].path.should.equal('home/usr/dev/null');
                    response.body.data[0].time_start.should.equal('2017-02-09 17:16:28');
                    response.body.data[0].time_stop.should.equal('2017-02-09 17:16:35');
                    done();
                });
        });
    });

    describe('/DELETE : Delete project', () => {
        it('return: status code 200, json, array, message : Project successfully deleted!', (done) => {
            chai.request(server.listener)
                .delete('/api/projects/2')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.should.be.json;
                    response.body.message.should.equal('Project successfully deleted!');
                    done();
                });
        });
    });
});