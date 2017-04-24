import { CommandSet } from 'pip-services-commons-node';
import { IImageSetsController } from './IImageSetsController';
export declare class ImageSetsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IImageSetsController);
    private makeGetImageSetsCommand();
    private makeGetImageSetByIdCommand();
    private makeCreateImageSetCommand();
    private makeUpdateImageSetCommand();
    private makeDeleteImageSetByIdCommand();
}
