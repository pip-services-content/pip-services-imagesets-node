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
class ImageSetsFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ImageSetsFactory.MemoryPersistenceDescriptor, ImageSetsMemoryPersistence_1.ImageSetsMemoryPersistence);
        this.registerAsType(ImageSetsFactory.FilePersistenceDescriptor, ImageSetsFilePersistence_1.ImageSetsFilePersistence);
        this.registerAsType(ImageSetsFactory.MongoDbPersistenceDescriptor, ImageSetsMongoDbPersistence_1.ImageSetsMongoDbPersistence);
        this.registerAsType(ImageSetsFactory.ControllerDescriptor, ImageSetsController_1.ImageSetsController);
        this.registerAsType(ImageSetsFactory.SenecaServiceDescriptor, ImageSetsSenecaServiceV1_1.ImageSetsSenecaServiceV1);
        this.registerAsType(ImageSetsFactory.HttpServiceDescriptor, ImageSetsHttpServiceV1_1.ImageSetsHttpServiceV1);
    }
}
ImageSetsFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "factory", "default", "default", "1.0");
ImageSetsFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "persistence", "memory", "*", "1.0");
ImageSetsFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "persistence", "file", "*", "1.0");
ImageSetsFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "persistence", "mongodb", "*", "1.0");
ImageSetsFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "controller", "default", "*", "1.0");
ImageSetsFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "service", "seneca", "*", "1.0");
ImageSetsFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-imagesets", "service", "http", "*", "1.0");
exports.ImageSetsFactory = ImageSetsFactory;
//# sourceMappingURL=ImageSetsFactory.js.map