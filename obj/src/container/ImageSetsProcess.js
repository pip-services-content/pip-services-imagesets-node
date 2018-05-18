"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const ImageSetsServiceFactory_1 = require("../build/ImageSetsServiceFactory");
class ImageSetsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("imagesets", "Image library microservice");
        this._factories.add(new ImageSetsServiceFactory_1.ImageSetsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.ImageSetsProcess = ImageSetsProcess;
//# sourceMappingURL=ImageSetsProcess.js.map