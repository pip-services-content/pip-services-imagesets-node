"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class ImageSetsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('imagesets');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
            let searchTags = pip_services3_commons_node_2.TagsProcessor.compressTags([tags]);
            criteria.push({ all_tags: { $in: searchTags } });
        }
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', null, callback);
    }
}
exports.ImageSetsMongoDbPersistence = ImageSetsMongoDbPersistence;
//# sourceMappingURL=ImageSetsMongoDbPersistence.js.map