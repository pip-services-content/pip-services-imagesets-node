"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const AttachmentV1Schema_1 = require("./AttachmentV1Schema");
class ImageSetV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services_commons_node_3.TypeCode.String);
        this.withRequiredProperty('title', pip_services_commons_node_3.TypeCode.String);
        /* Generic request properties */
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);
        /* Common properties */
        this.withOptionalProperty('title', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('pics', new pip_services_commons_node_2.ArraySchema(new AttachmentV1Schema_1.AttachmentV1Schema()));
        /* Search */
        this.withOptionalProperty('tags', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
    }
}
exports.ImageSetV1Schema = ImageSetV1Schema;
//# sourceMappingURL=ImageSetV1Schema.js.map