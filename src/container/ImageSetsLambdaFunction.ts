import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { ImageSetsServiceFactory } from '../build/ImageSetsServiceFactory';

export class ImageSetsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("imagesets", "Image library function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-imagesets', 'controller', 'default', '*', '*'));
        this._factories.add(new ImageSetsServiceFactory());
    }
}

export const handler = new ImageSetsLambdaFunction().getHandler();