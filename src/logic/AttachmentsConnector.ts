let _ = require('lodash');

import { ReferenceV1 } from 'pip-clients-attachments-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { ImageSetV1 } from '../data/version1/ImageSetV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(imageset: ImageSetV1): string[] {
        let ids: string[] = [];

        _.each(imageset.pics, (pic) => {
            if (pic.id)
                ids.push(pic.id);
        });

        return ids;
    }

    public addAttachments(correlationId: string, imageset: ImageSetV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || imageset == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(imageset);
        let reference = new ReferenceV1(imageset.id, 'imageset');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

    public updateAttachments(correlationId: string, oldImageSet: ImageSetV1,
        newImageSet: ImageSetV1, callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || oldImageSet == null || newImageSet == null) {
            callback(null);
            return;
        }

        let oldIds = this.extractAttachmentIds(oldImageSet);
        let newIds = this.extractAttachmentIds(newImageSet);
        let reference = new ReferenceV1(newImageSet.id, 'imageset');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        })
    }

    public removeAttachments(correlationId: string, imageset: ImageSetV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || imageset == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(imageset);
        let reference = new ReferenceV1(imageset.id, 'imageset');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

}