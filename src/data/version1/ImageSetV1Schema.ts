import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class ImageSetV1Schema extends ObjectSchema {
    public constructor() {
        super();
    
        /* Identification */
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('title', TypeCode.String);

        /* Generic request properties */
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);

        /* Common properties */
        this.withOptionalProperty('title', TypeCode.String);
        this.withOptionalProperty('pic_ids', new ArraySchema(TypeCode.String));

        /* Search */
        this.withOptionalProperty('tags', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('all_tags', new ArraySchema(TypeCode.String));
    }
}
