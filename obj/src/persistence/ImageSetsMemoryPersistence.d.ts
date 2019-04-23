import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsPersistence } from './IImageSetsPersistence';
export declare class ImageSetsMemoryPersistence extends IdentifiableMemoryPersistence<ImageSetV1, string> implements IImageSetsPersistence {
    constructor();
    private matchString;
    private matchMultiString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ImageSetV1>) => void): void;
}
