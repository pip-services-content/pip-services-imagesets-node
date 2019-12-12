import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsPersistence } from './IImageSetsPersistence';
export declare class ImageSetsMongoDbPersistence extends IdentifiableMongoDbPersistence<ImageSetV1, string> implements IImageSetsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
}
