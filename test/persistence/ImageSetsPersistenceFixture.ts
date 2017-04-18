let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { IImageSetsPersistence } from '../../src/persistence/IImageSetsPersistence';
import { ImageSetV1 } from '../../src/data/version1/ImageSetV1';

let IMAGESET1 = <ImageSetV1>{
    id: '1',
    title: 'ImageSet 1',
    pic_ids: ['111','222','333']
};
let IMAGESET2 = <ImageSetV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    title: 'ImageSet 2',
    pic_ids: ['444','555','666']
};
let IMAGESET3 = <ImageSetV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    title: 'ImageSet 3',
    pic_ids: ['777']
};

export class ImageSetsPersistenceFixture {
    private _persistence: IImageSetsPersistence;
    
    constructor(persistence: IImageSetsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public createImageSets(done) {
        async.series([
        // Create one imageset
            (callback) => {
                this._persistence.create(
                    null,
                    IMAGESET1,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, IMAGESET1.title);
                        assert.sameMembers(imageset.pic_ids, IMAGESET1.pic_ids);

                        callback();
                    }
                );
            },
        // Create another imageset
            (callback) => {
                this._persistence.create(
                    null,
                    IMAGESET2,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, IMAGESET2.title);
                        assert.sameMembers(imageset.pic_ids, IMAGESET2.pic_ids);

                        callback();
                    }
                );
            },
        // Create yet another imageset
            (callback) => {
                this._persistence.create(
                    null,
                    IMAGESET3,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, IMAGESET3.title);
                        assert.sameMembers(imageset.pic_ids, IMAGESET3.pic_ids);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let imageset1: ImageSetV1;

        async.series([
        // Create items
            (callback) => {
                this.createImageSets(callback);
            },
        // Get all imagesets
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        imageset1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the imageset
            (callback) => {
                imageset1.title = 'New Title 1';

                this._persistence.update(
                    null,
                    imageset1,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isObject(imageset);
                        assert.equal(imageset.title, 'New Title 1');
                        assert.sameMembers(imageset.pic_ids, imageset1.pic_ids);

                        callback();
                    }
                );
            },
        // Delete imageset
            (callback) => {
                this._persistence.deleteById(
                    null,
                    imageset1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete imageset
            (callback) => {
                this._persistence.getOneById(
                    null,
                    imageset1.id,
                    (err, imageset) => {
                        assert.isNull(err);
                        
                        assert.isNull(imageset || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create imagesets
            (callback) => {
                this.createImageSets(callback);
            },
        // Get imagesets filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1']
                    }),
                    new PagingParams(),
                    (err, imagesets) => {
                        assert.isNull(err);
                        
                        assert.isObject(imagesets);
                        assert.lengthOf(imagesets.data, 2);

                        callback();
                    }
                );
            },
        // Get imagesets filtered by title
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: IMAGESET3.title
                    }),
                    new PagingParams(),
                    (err, imagesets) => {
                        assert.isNull(err);
                        
                        assert.isObject(imagesets);
                        assert.lengthOf(imagesets.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

}
