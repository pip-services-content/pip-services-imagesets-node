import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsPersistence } from './IImageSetsPersistence';
export declare class ImageSetsMongoDbPersistence extends IdentifiableMongoDbPersistence<ImageSetV1, string> implements IImageSetsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
}
