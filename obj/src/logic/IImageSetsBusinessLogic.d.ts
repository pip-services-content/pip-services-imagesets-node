import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
export interface IImageSetsBusinessLogic {
    getImageSets(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ImageSetV1>) => void): void;
    getImageSetById(correlationId: string, imagesetId: string, callback: (err: any, imageset: ImageSetV1) => void): void;
    createImageSet(correlationId: string, imageset: ImageSetV1, callback: (err: any, imageset: ImageSetV1) => void): void;
    updateImageSet(correlationId: string, imageset: ImageSetV1, callback: (err: any, imageset: ImageSetV1) => void): void;
    deleteImageSetById(correlationId: string, imagesetId: string, callback: (err: any, imageset: ImageSetV1) => void): void;
}
