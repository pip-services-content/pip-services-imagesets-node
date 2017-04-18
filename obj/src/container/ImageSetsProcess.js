"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const ImageSetsFactory_1 = require("../build/ImageSetsFactory");
class ImageSetsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("imagesets", "Image library microservice");
        this._factories.add(new ImageSetsFactory_1.ImageSetsFactory);
    }
}
exports.ImageSetsProcess = ImageSetsProcess;
//# sourceMappingURL=ImageSetsProcess.js.map