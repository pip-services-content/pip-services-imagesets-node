import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { ImageSetsMongoDbPersistence } from '../persistence/ImageSetsMongoDbPersistence';
import { ImageSetsFilePersistence } from '../persistence/ImageSetsFilePersistence';
import { ImageSetsMemoryPersistence } from '../persistence/ImageSetsMemoryPersistence';
import { ImageSetsController } from '../logic/ImageSetsController';
import { ImageSetsHttpServiceV1 } from '../services/version1/ImageSetsHttpServiceV1';
import { ImageSetsSenecaServiceV1 } from '../services/version1/ImageSetsSenecaServiceV1'; 

export class ImageSetsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-imagesets", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-imagesets", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-imagesets", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-imagesets", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-imagesets", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-imagesets", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-imagesets", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ImageSetsServiceFactory.MemoryPersistenceDescriptor, ImageSetsMemoryPersistence);
		this.registerAsType(ImageSetsServiceFactory.FilePersistenceDescriptor, ImageSetsFilePersistence);
		this.registerAsType(ImageSetsServiceFactory.MongoDbPersistenceDescriptor, ImageSetsMongoDbPersistence);
		this.registerAsType(ImageSetsServiceFactory.ControllerDescriptor, ImageSetsController);
		this.registerAsType(ImageSetsServiceFactory.SenecaServiceDescriptor, ImageSetsSenecaServiceV1);
		this.registerAsType(ImageSetsServiceFactory.HttpServiceDescriptor, ImageSetsHttpServiceV1);
	}
	
}
