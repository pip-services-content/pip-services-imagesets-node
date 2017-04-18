let _ = require('lodash');

import { ReferenceV1 } from 'pip-clients-attachments-node';
import { AttachmentV1 } from 'pip-clients-attachments-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { ImageSetV1 } from '../data/version1/ImageSetV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    public addAttachments(correlationId: string, imageset: ImageSetV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || imageset == null) {
            callback(null);
            return;
        }

        let reference = new ReferenceV1(imageset.id, 'imageset');
        this._attachmentsClient.addAttachments(correlationId, reference, imageset.pic_ids, (err) => {
            callback(err);
        })
    }

    public updateAttachments(correlationId: string, oldImageSet: ImageSetV1,
        newImageSet: ImageSetV1, callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || oldImageSet == null || newImageSet == null) {
            callback(null);
            return;
        }

        let reference = new ReferenceV1(newImageSet.id, 'imageset');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldImageSet.pic_ids, newImageSet.pic_ids, (err) => {
            callback(err);
        })
    }

    public removeAttachments(correlationId: string, imageset: ImageSetV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || imageset == null) {
            callback(null);
            return;
        }

        let reference = new ReferenceV1(imageset.id, 'imageset');
        this._attachmentsClient.removeAttachments(correlationId, reference, imageset.pic_ids, (err) => {
            callback(err);
        })
    }

}