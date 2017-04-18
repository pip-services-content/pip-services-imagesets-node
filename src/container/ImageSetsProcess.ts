import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { ImageSetsFactory } from '../build/ImageSetsFactory';

export class ImageSetsProcess extends ProcessContainer {

    public constructor() {
        super("imagesets", "Image library microservice");
        this._factories.add(new ImageSetsFactory);
    }

}
