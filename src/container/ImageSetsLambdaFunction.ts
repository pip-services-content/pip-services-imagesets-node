import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { ImageSetsFactory } from '../build/ImageSetsFactory';

export class ImageSetsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("imagesets", "Image library function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-imagesets', 'controller', 'default', '*', '*'));
        this._factories.add(new ImageSetsFactory());
    }
}

export const handler = new ImageSetsLambdaFunction().getHandler();