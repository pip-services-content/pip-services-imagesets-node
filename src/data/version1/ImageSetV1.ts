import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

export class ImageSetV1 implements IStringIdentifiable {

    public constructor(id: string, title: string, picIds?: string[]) {
        this.id = id;
        this.title = title;
        this.pic_ids = [];
        this.create_time = new Date();
    }

    /* Identification */
    public id: string;

    /* Automatically set fields */
    public create_time: Date;

    /* Content */
    public title: string;
    public pic_ids?: string[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];
}
