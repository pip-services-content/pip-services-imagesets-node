import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';

import { ImageSetV1 } from '../data/version1/ImageSetV1';

export interface IImageSetsPersistence
    extends IGetter<ImageSetV1, string>, IWriter<ImageSetV1, string>  {
    
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ImageSetV1>) => void): void;

    getOneById(correlationId: string, id: string,
        callback: (err: any, item: ImageSetV1) => void): void;

    create(correlationId: string, item: ImageSetV1,
        callback: (err: any, item: ImageSetV1) => void): void;

    update(correlationId: string, item: ImageSetV1,
        callback: (err: any, item: ImageSetV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: ImageSetV1) => void): void;
}

