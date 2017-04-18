"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class ImageSetsHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('imagesets');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'controller', 'default', '*', '1.0'));
    }
}
exports.ImageSetsHttpServiceV1 = ImageSetsHttpServiceV1;
//# sourceMappingURL=ImageSetsHttpServiceV1.js.map