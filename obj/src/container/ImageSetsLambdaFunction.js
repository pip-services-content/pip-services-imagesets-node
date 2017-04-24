"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const ImageSetsServiceFactory_1 = require("../build/ImageSetsServiceFactory");
class ImageSetsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("imagesets", "Image library function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-imagesets', 'controller', 'default', '*', '*'));
        this._factories.add(new ImageSetsServiceFactory_1.ImageSetsServiceFactory());
    }
}
exports.ImageSetsLambdaFunction = ImageSetsLambdaFunction;
exports.handler = new ImageSetsLambdaFunction().getHandler();
//# sourceMappingURL=ImageSetsLambdaFunction.js.map