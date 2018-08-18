import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class ImageSetsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/imagesets');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-imagesets', 'controller', 'default', '*', '1.0'));
    }
}