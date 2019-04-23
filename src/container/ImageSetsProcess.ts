import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { ImageSetsServiceFactory } from '../build/ImageSetsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class ImageSetsProcess extends ProcessContainer {

    public constructor() {
        super("imagesets", "Image library microservice");
        this._factories.add(new ImageSetsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
