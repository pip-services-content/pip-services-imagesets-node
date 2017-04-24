"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    extractAttachmentIds(imageset) {
        let ids = [];
        _.each(imageset.pics, (pic) => {
            if (pic.id)
                ids.push(pic.id);
        });
        return ids;
    }
    addAttachments(correlationId, imageset, callback) {
        if (this._attachmentsClient == null || imageset == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(imageset);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(imageset.id, 'imageset');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
    updateAttachments(correlationId, oldImageSet, newImageSet, callback) {
        if (this._attachmentsClient == null || oldImageSet == null || newImageSet == null) {
            callback(null);
            return;
        }
        let oldIds = this.extractAttachmentIds(oldImageSet);
        let newIds = this.extractAttachmentIds(newImageSet);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(newImageSet.id, 'imageset');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        });
    }
    removeAttachments(correlationId, imageset, callback) {
        if (this._attachmentsClient == null || imageset == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(imageset);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(imageset.id, 'imageset');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map