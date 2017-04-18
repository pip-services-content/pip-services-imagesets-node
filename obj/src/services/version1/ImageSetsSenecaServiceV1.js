"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class ImageSetsSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('imagesets');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'controller', 'default', '*', '1.0'));
    }
}
exports.ImageSetsSenecaServiceV1 = ImageSetsSenecaServiceV1;
//# sourceMappingURL=ImageSetsSenecaServiceV1.js.map