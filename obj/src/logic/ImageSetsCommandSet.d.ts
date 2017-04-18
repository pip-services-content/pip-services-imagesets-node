import { CommandSet } from 'pip-services-commons-node';
import { IImageSetsBusinessLogic } from './IImageSetsBusinessLogic';
export declare class ImageSetsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IImageSetsBusinessLogic);
    private makeGetImageSetsCommand();
    private makeGetImageSetByIdCommand();
    private makeCreateImageSetCommand();
    private makeUpdateImageSetCommand();
    private makeDeleteImageSetByIdCommand();
}
