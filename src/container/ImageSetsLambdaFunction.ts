import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { ImageSetsServiceFactory } from '../build/ImageSetsServiceFactory';

export class ImageSetsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("imagesets", "Image library function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-imagesets', 'controller', 'default', '*', '*'));
        this._factories.add(new ImageSetsServiceFactory());
    }
}

export const handler = new ImageSetsLambdaFunction().getHandler();