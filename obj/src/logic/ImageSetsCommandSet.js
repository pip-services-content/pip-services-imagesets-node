"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const ImageSetV1Schema_1 = require("../data/version1/ImageSetV1Schema");
class ImageSetsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetImageSetsCommand());
        this.addCommand(this.makeGetImageSetByIdCommand());
        this.addCommand(this.makeCreateImageSetCommand());
        this.addCommand(this.makeUpdateImageSetCommand());
        this.addCommand(this.makeDeleteImageSetByIdCommand());
    }
    makeGetImageSetsCommand() {
        return new pip_services_commons_node_2.Command("get_imagesets", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getImageSets(correlationId, filter, paging, callback);
        });
    }
    makeGetImageSetByIdCommand() {
        return new pip_services_commons_node_2.Command("get_imageset_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('imageset_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let imagesetId = args.getAsNullableString("imageset_id");
            this._logic.getImageSetById(correlationId, imagesetId, callback);
        });
    }
    makeCreateImageSetCommand() {
        return new pip_services_commons_node_2.Command("create_imageset", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('imageset', new ImageSetV1Schema_1.ImageSetV1Schema()), (correlationId, args, callback) => {
            let imageset = args.get("imageset");
            this._logic.createImageSet(correlationId, imageset, callback);
        });
    }
    makeUpdateImageSetCommand() {
        return new pip_services_commons_node_2.Command("update_imageset", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('imageset', new ImageSetV1Schema_1.ImageSetV1Schema()), (correlationId, args, callback) => {
            let imageset = args.get("imageset");
            this._logic.updateImageSet(correlationId, imageset, callback);
        });
    }
    makeDeleteImageSetByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_imageset_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('imageset_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let imagesetId = args.getAsNullableString("imageset_id");
            this._logic.deleteImageSetById(correlationId, imagesetId, callback);
        });
    }
}
exports.ImageSetsCommandSet = ImageSetsCommandSet;
//# sourceMappingURL=ImageSetsCommandSet.js.map