import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsPersistence } from './IImageSetsPersistence';
export declare class ImageSetsMemoryPersistence extends IdentifiableMemoryPersistence<ImageSetV1, string> implements IImageSetsPersistence {
    constructor();
    private matchString(value, search);
    private matchMultiString(item, search);
    private matchSearch(item, search);
    private contains(array1, array2);
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ImageSetV1>) => void): void;
}
