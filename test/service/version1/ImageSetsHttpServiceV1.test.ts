let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';

import { ImageSetV1 } from '../../../src/data/version1/ImageSetV1';
import { ImageSetsMemoryPersistence } from '../../../src/persistence/ImageSetsMemoryPersistence';
import { ImageSetsController } from '../../../src/logic/ImageSetsController';
import { ImageSetsHttpServiceV1 } from '../../../src/services/version1/ImageSetsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let IMAGESET1 = <ImageSetV1>{
    id: '1',
    title: 'ImageSet 1',
    pics: [{ id: '111' },{ id: '222' },{ id: '333' }]
};
let IMAGESET2 = <ImageSetV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    title: 'ImageSet 2',
    pics: [{ id: '444' }, { id: '555' }, { id: '666' }]
};

suite('ImageSetsHttpServiceV1', ()=> {
    let service: ImageSetsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new ImageSetsMemoryPersistence();
        let controller = new ImageSetsController();

        service = new ImageSetsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-imagesets', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-imagesets', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-imagesets', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', (done) => {
        let imageset1, imageset2;

        async.series([
        // Create one imageset
            (callback) => {
                rest.post('/v1/imagesets/create_imageset',
                    {
                        imageset: IMAGESET1
                    },
                    (err, req, res, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, IMAGESET1.title);
                        assert.sameDeepMembers(imageset.pics, IMAGESET1.pics);

                        imageset1 = imageset;

                        callback();
                    }
                );
            },
        // Create another imageset
            (callback) => {
                rest.post('/v1/imagesets/create_imageset',
                    {
                        imageset: IMAGESET2
                    },
                    (err, req, res, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, IMAGESET2.title);
                        assert.sameDeepMembers(imageset.pics, IMAGESET2.pics);

                        imageset2 = imageset;

                        callback();
                    }
                );
            },
        // Get all imagesets
            (callback) => {
                rest.post('/v1/imagesets/get_imagesets',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the imageset
            (callback) => {
                imageset1.title = 'New Title 1';

                rest.post('/v1/imagesets/update_imageset',
                    {
                        imageset: imageset1
                    },
                    (err, req, res, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, 'New Title 1');
                        assert.sameDeepMembers(imageset.pics, imageset1.pics);

                        imageset1 = imageset;

                        callback();
                    }
                );
            },
        // Delete imageset
            (callback) => {
                rest.post('/v1/imagesets/delete_imageset_by_id',
                    {
                        imageset_id: imageset1.id
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete imageset
            (callback) => {
                rest.post('/v1/imagesets/get_imageset_by_id',
                    {
                        imageset_id: imageset1.id
                    },
                    (err, req, res, imageset) => {
                        assert.isNull(err);
                        
                        //assert.isNull(imageset || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});