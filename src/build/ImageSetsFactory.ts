import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { ImageSetsMongoDbPersistence } from '../persistence/ImageSetsMongoDbPersistence';
import { ImageSetsFilePersistence } from '../persistence/ImageSetsFilePersistence';
import { ImageSetsMemoryPersistence } from '../persistence/ImageSetsMemoryPersistence';
import { ImageSetsController } from '../logic/ImageSetsController';
import { ImageSetsHttpServiceV1 } from '../services/version1/ImageSetsHttpServiceV1';
import { ImageSetsSenecaServiceV1 } from '../services/version1/ImageSetsSenecaServiceV1'; 

export class ImageSetsFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-imagesets", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-imagesets", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-imagesets", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-imagesets", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-imagesets", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-imagesets", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-imagesets", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ImageSetsFactory.MemoryPersistenceDescriptor, ImageSetsMemoryPersistence);
		this.registerAsType(ImageSetsFactory.FilePersistenceDescriptor, ImageSetsFilePersistence);
		this.registerAsType(ImageSetsFactory.MongoDbPersistenceDescriptor, ImageSetsMongoDbPersistence);
		this.registerAsType(ImageSetsFactory.ControllerDescriptor, ImageSetsController);
		this.registerAsType(ImageSetsFactory.SenecaServiceDescriptor, ImageSetsSenecaServiceV1);
		this.registerAsType(ImageSetsFactory.HttpServiceDescriptor, ImageSetsHttpServiceV1);
	}
	
}
