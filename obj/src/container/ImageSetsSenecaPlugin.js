"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
const pip_services_seneca_node_2 = require("pip-services-seneca-node");
const ImageSetsMemoryPersistence_1 = require("../persistence/ImageSetsMemoryPersistence");
const ImageSetsFilePersistence_1 = require("../persistence/ImageSetsFilePersistence");
const ImageSetsMongoDbPersistence_1 = require("../persistence/ImageSetsMongoDbPersistence");
const ImageSetsController_1 = require("../logic/ImageSetsController");
const ImageSetsSenecaServiceV1_1 = require("../services/version1/ImageSetsSenecaServiceV1");
class ImageSetsSenecaPlugin extends pip_services_seneca_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-imagesets', seneca, ImageSetsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_components_node_1.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new ImageSetsController_1.ImageSetsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new ImageSetsMongoDbPersistence_1.ImageSetsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new ImageSetsFilePersistence_1.ImageSetsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new ImageSetsMemoryPersistence_1.ImageSetsMemoryPersistence();
        else
            throw new pip_services_commons_node_4.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_seneca_node_2.SenecaInstance(seneca);
        let service = new ImageSetsSenecaServiceV1_1.ImageSetsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-imagesets', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-imagesets', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-imagesets', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.ImageSetsSenecaPlugin = ImageSetsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new ImageSetsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=ImageSetsSenecaPlugin.js.map