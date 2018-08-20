"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const ImageSetsServiceFactory_1 = require("../build/ImageSetsServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class ImageSetsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("imagesets", "Image library microservice");
        this._factories.add(new ImageSetsServiceFactory_1.ImageSetsServiceFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.ImageSetsProcess = ImageSetsProcess;
//# sourceMappingURL=ImageSetsProcess.js.map