import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let ImageSetsMongoDbSchema = function(collection?: string) {
    collection = collection || 'imagesets';

    let schema = new Schema(
        {
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
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}