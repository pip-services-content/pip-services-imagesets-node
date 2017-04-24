"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const ImageSetsMongoDbPersistence_1 = require("../persistence/ImageSetsMongoDbPersistence");
const ImageSetsFilePersistence_1 = require("../persistence/ImageSetsFilePersistence");
const ImageSetsMemoryPersistence_1 = require("../persistence/ImageSetsMemoryPersistence");
const ImageSetsController_1 = require("../logic/ImageSetsController");
const ImageSetsHttpServiceV1_1 = require("../services/version1/ImageSetsHttpServiceV1");
const ImageSetsSenecaServiceV1_1 = require("../services/version1/ImageSetsSenecaServiceV1");
class ImageSetsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ImageSetsServiceFactory.MemoryPersistenceDescriptor, ImageSetsMemoryPersistence_1.ImageSetsMemoryPersistence);
        this.registerAsType(ImageSetsServiceFactory.FilePersistenceDescriptor, ImageSetsFilePersistence_1.ImageSetsFilePersistence);
        this.registerAsType(ImageSetsServiceFactory.MongoDbPersistenceDescriptor, ImageSetsMongoDbPersistence_1.ImageSetsMongoDbPersistence);
        this.registerAsType(ImageSetsServiceFactory.ControllerDescriptor, ImageSetsController_1.ImageSetsController);
        this.registerAsType(ImageSetsServiceFactory.SenecaServiceDescriptor, ImageSetsSenecaServiceV1_1.ImageSetsSenecaServiceV1);
        this.registerAsType(ImageSetsServiceFactory.HttpServiceDescriptor, ImageSetsHttpServiceV1_1.ImageSetsHttpServiceV1);
    }
}
ImageSetsServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "factory", "default", "default", "1.0");
ImageSetsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "persistence", "memory", "*", "1.0");
ImageSetsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "persistence", "file", "*", "1.0");
ImageSetsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "persistence", "mongodb", "*", "1.0");
ImageSetsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "controller", "default", "*", "1.0");
ImageSetsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "service", "seneca", "*", "1.0");
ImageSetsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "service", "http", "*", "1.0");
exports.ImageSetsServiceFactory = ImageSetsServiceFactory;
//# sourceMappingURL=ImageSetsServiceFactory.js.map