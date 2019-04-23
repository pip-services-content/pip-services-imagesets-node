import { ConfigParams } from 'pip-services3-commons-node';

import { ImageSetsFilePersistence } from '../../src/persistence/ImageSetsFilePersistence';
import { ImageSetsPersistenceFixture } from './ImageSetsPersistenceFixture';

suite('ImageSetsFilePersistence', ()=> {
    let persistence: ImageSetsFilePersistence;
    let fixture: ImageSetsPersistenceFixture;
    
    setup((done) => {
        persistence = new ImageSetsFilePersistence('./data/ImageSets.test.json');

        fixture = new ImageSetsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
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