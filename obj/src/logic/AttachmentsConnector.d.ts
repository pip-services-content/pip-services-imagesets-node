import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';
import { ImageSetV1 } from '../data/version1/ImageSetV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    addAttachments(correlationId: string, imageset: ImageSetV1, callback: (err: any) => void): void;
    updateAttachments(correlationId: string, oldImageSet: ImageSetV1, newImageSet: ImageSetV1, callback: (err: any) => void): void;
    removeAttachments(correlationId: string, imageset: ImageSetV1, callback: (err: any) => void): void;
}
