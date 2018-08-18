let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsPersistence } from '../persistence/IImageSetsPersistence';
import { IImageSetsController } from './IImageSetsController';
import { ImageSetsCommandSet } from './ImageSetsCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class ImageSetsController implements IConfigurable, IReferenceable, ICommandable, IImageSetsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-imagesets:persistence:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ImageSetsController._defaultConfig);
    private _persistence: IImageSetsPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: ImageSetsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IImageSetsPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ImageSetsCommandSet(this);
        return this._commandSet;
    }

    public getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ImageSetV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getImageSetById(correlationId: string, imagesetId: string,
        callback: (err: any, item: ImageSetV1) => void): void {
        this._persistence.getOneById(correlationId, imagesetId, callback);
    }

    public createImageSet(correlationId: string, imageset: ImageSetV1,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        let newImageSet: ImageSetV1 = null;

        imageset.create_time = new Date();
        imageset.all_tags = TagsProcessor.extractHashTags('title');

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

    public updateImageSet(correlationId: string, imageset: ImageSetV1,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        let oldImageSet: ImageSetV1 = null;
        let newImageSet: ImageSetV1 = null;
        
        imageset.all_tags = TagsProcessor.extractHashTags('title');

        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, imageset.id, (err, data) => {
                    oldImageSet = data;
                    if (err == null && data == null) {
                        err = new NotFoundException(
                            correlationId,
                            'IMAGESET_NOT_FOUND',
                            'ImageSet ' + imageset.id + ' was not found'
                        ).withDetails('imageset_id', imageset.id);
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
                this._attachmentsConnector.updateAttachments(
                    correlationId, oldImageSet, newImageSet, callback);
            }
        ], (err) => {
            callback(err, newImageSet);
        });
    }

    public deleteImageSetById(correlationId: string, imagesetId: string,
        callback: (err: any, imageset: ImageSetV1) => void): void {
        let oldImageSet: ImageSetV1 = null;

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
