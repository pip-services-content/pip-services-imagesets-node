import { YamlConfigReader } from 'pip-services-commons-node';

import { ImageSetsMongoDbPersistence } from '../../src/persistence/ImageSetsMongoDbPersistence';
import { ImageSetsPersistenceFixture } from './ImageSetsPersistenceFixture';

suite('ImageSetsMongoDbPersistence', ()=> {
    let persistence: ImageSetsMongoDbPersistence;
    let fixture: ImageSetsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new ImageSetsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new ImageSetsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});