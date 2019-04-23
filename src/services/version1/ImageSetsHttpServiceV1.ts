import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class ImageSetsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/imagesets');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-imagesets', 'controller', 'default', '*', '1.0'));
    }
}