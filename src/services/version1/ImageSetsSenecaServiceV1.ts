import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class ImageSetsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('imagesets');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-imagesets', 'controller', 'default', '*', '1.0'));
    }
}