"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.ImageSetsMongoDbSchema = function (collection) {
    collection = collection || 'imagesets';
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String, unique: true },
        /* Automatically managed fields */
        create_time: { type: Date, required: true, 'default': Date.now },
        /* Content */
        title: { type: String, required: false },
        pic_ids: { type: [String], required: false },
        /* Search  */
        tags: { type: [String], required: false },
        all_tags: { type: [String], required: false, index: true }
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=ImageSetsMongoDbSchema.js.map