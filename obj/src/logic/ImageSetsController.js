"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const ImageSetsCommandSet_1 = require("./ImageSetsCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class ImageSetsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(ImageSetsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ImageSetsCommandSet_1.ImageSetsCommandSet(this);
        return this._commandSet;
    }
    getImageSets(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getImageSetById(correlationId, imagesetId, callback) {
        this._persistence.getOneById(correlationId, imagesetId, callback);
    }
    createImageSet(correlationId, imageset, callback) {
        let newImageSet = null;
        imageset.create_time = new Date();
        imageset.all_tags = pip_services3_commons_node_3.TagsProcessor.extractHashTags('#title');
        async.series([
            (callback) => {
                this._persistence.create(correlationId, imageset, (err, data) => {
                    newImageSet = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.addAttachments(correlationId, newImageSet, callback);
            }
        ], (err) => {
            callback(err, newImageSet);
        });
    }
    updateImageSet(correlationId, imageset, callback) {
        let oldImageSet = null;
        let newImageSet = null;
        imageset.all_tags = pip_services3_commons_node_3.TagsProcessor.extractHashTags('#title');
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, imageset.id, (err, data) => {
                    oldImageSet = data;
                    if (err == null && data == null) {
                        err = new pip_services3_commons_node_4.NotFoundException(correlationId, 'IMAGESET_NOT_FOUND', 'ImageSet ' + imageset.id + ' was not found').withDetails('imageset_id', imageset.id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.update(correlationId, imageset, (err, data) => {
                    newImageSet = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.updateAttachments(correlationId, oldImageSet, newImageSet, callback);
            }
        ], (err) => {
            callback(err, newImageSet);
        });
    }
    deleteImageSetById(correlationId, imagesetId, callback) {
        let oldImageSet = null;
        async.series([
            (callback) => {
                this._persistence.deleteById(correlationId, imagesetId, (err, data) => {
                    oldImageSet = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.removeAttachments(correlationId, oldImageSet, callback);
            }
        ], (err) => {
            callback(err, oldImageSet);
        });
    }
}
ImageSetsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-imagesets:persistence:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
exports.ImageSetsController = ImageSetsController;
//# sourceMappingURL=ImageSetsController.js.map