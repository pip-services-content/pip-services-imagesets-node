import { ImageSetsMemoryPersistence } from '../../src/persistence/ImageSetsMemoryPersistence';
import { ImageSetsPersistenceFixture } from './ImageSetsPersistenceFixture';

suite('ImageSetsMemoryPersistence', ()=> {
    let persistence: ImageSetsMemoryPersistence;
    let fixture: ImageSetsPersistenceFixture;
    
    setup((done) => {
        persistence = new ImageSetsMemoryPersistence();
        fixture = new ImageSetsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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