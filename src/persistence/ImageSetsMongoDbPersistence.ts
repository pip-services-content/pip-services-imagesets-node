let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-mongodb-node';

import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { IImageSetsPersistence } from './IImageSetsPersistence';
import { ImageSetsMongoDbSchema } from './ImageSetsMongoDbSchema';

export class ImageSetsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<ImageSetV1, string> 
    implements IImageSetsPersistence {

    constructor() {
        super('imagesets', ImageSetsMongoDbSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ 'title': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        // Search by tags
        let tags = filter.getAsObject('tags');
        if (tags) {
            let searchTags = TagsProcessor.compressTags([tags]);
            criteria.push({ all_tags: { $in: searchTags } });
        }

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', null, callback);
    }

}
