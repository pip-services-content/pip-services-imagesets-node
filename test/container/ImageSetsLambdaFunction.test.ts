let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';
import { MultiString } from 'pip-services3-commons-node';

import { ImageSetV1 } from '../../src/data/version1/ImageSetV1';
import { ImageSetsMemoryPersistence } from '../../src/persistence/ImageSetsMemoryPersistence';
import { ImageSetsController } from '../../src/logic/ImageSetsController';
import { ImageSetsLambdaFunction } from '../../src/container/ImageSetsLambdaFunction';

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

suite('ImageSetsLambdaFunction', ()=> {
    let lambda: ImageSetsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-imagesets:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-imagesets:controller:default:default:1.0'
        );

        lambda = new ImageSetsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let imageset1, imageset2;

        async.series([
        // Create one imageset
            (callback) => {
                lambda.act(
                    {
                        role: 'imagesets',
                        cmd: 'create_imageset',
                        imageset: IMAGESET1
                    },
                    (err, imageset) => {
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
                lambda.act(
                    {
                        role: 'imagesets',
                        cmd: 'create_imageset',
                        imageset: IMAGESET2
                    },
                    (err, imageset) => {
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
                lambda.act(
                    {
                        role: 'imagesets',
                        cmd: 'get_imagesets' 
                    },
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the imageset
            (callback) => {
                imageset1.title = 'New Title 1' ;

                lambda.act(
                    {
                        role: 'imagesets',
                        cmd: 'update_imageset',
                        imageset: imageset1
                    },
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, 'New Title 1');
                        assert.sameDeepMembers(imageset.pics, IMAGESET1.pics);

                        imageset1 = imageset;

                        callback();
                    }
                );
            },
        // Delete imageset
            (callback) => {
                lambda.act(
                    {
                        role: 'imagesets',
                        cmd: 'delete_imageset_by_id',
                        imageset_id: imageset1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete imageset
            (callback) => {
                lambda.act(
                    {
                        role: 'imagesets',
                        cmd: 'get_imageset_by_id',
                        imageset_id: imageset1.id
                    },
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isNull(imageset || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});