import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsController } from './IImageSetsController';
export declare class ImageSetsController implements IConfigurable, IReferenceable, ICommandable, IImageSetsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ImageSetV1>) => void): void;
    getImageSetById(correlationId: string, imagesetId: string, callback: (err: any, item: ImageSetV1) => void): void;
    createImageSet(correlationId: string, imageset: ImageSetV1, callback: (err: any, imageset: ImageSetV1) => void): void;
    updateImageSet(correlationId: string, imageset: ImageSetV1, callback: (err: any, imageset: ImageSetV1) => void): void;
    deleteImageSetById(correlationId: string, imagesetId: string, callback: (err: any, imageset: ImageSetV1) => void): void;
}
