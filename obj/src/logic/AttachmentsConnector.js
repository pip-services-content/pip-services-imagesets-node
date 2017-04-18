"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    addAttachments(correlationId, imageset, callback) {
        if (this._attachmentsClient == null || imageset == null) {
            callback(null);
            return;
        }
        let reference = new pip_clients_attachments_node_1.ReferenceV1(imageset.id, 'imageset');
        this._attachmentsClient.addAttachments(correlationId, reference, imageset.pic_ids, (err) => {
            callback(err);
        });
    }
    updateAttachments(correlationId, oldImageSet, newImageSet, callback) {
        if (this._attachmentsClient == null || oldImageSet == null || newImageSet == null) {
            callback(null);
            return;
        }
        let reference = new pip_clients_attachments_node_1.ReferenceV1(newImageSet.id, 'imageset');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldImageSet.pic_ids, newImageSet.pic_ids, (err) => {
            callback(err);
        });
    }
    removeAttachments(correlationId, imageset, callback) {
        if (this._attachmentsClient == null || imageset == null) {
            callback(null);
            return;
        }
        let reference = new pip_clients_attachments_node_1.ReferenceV1(imageset.id, 'imageset');
        this._attachmentsClient.removeAttachments(correlationId, reference, imageset.pic_ids, (err) => {
            callback(err);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map