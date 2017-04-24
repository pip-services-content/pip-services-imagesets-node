import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { ImageSetV1 } from '../data/version1/ImageSetV1';
import { ImageSetV1Schema } from '../data/version1/ImageSetV1Schema';
import { IImageSetsController } from './IImageSetsController';

export class ImageSetsCommandSet extends CommandSet {
    private _logic: IImageSetsController;

	constructor(logic: IImageSetsController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetImageSetsCommand());
		this.addCommand(this.makeGetImageSetByIdCommand());
		this.addCommand(this.makeCreateImageSetCommand());
		this.addCommand(this.makeUpdateImageSetCommand());
		this.addCommand(this.makeDeleteImageSetByIdCommand());
	}

	private makeGetImageSetsCommand(): ICommand {
		return new Command(
			"get_imagesets",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getImageSets(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetImageSetByIdCommand(): ICommand {
		return new Command(
			"get_imageset_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('imageset_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let imagesetId = args.getAsNullableString("imageset_id");
				this._logic.getImageSetById(correlationId, imagesetId, callback);
			}
		);
	}

	private makeCreateImageSetCommand(): ICommand {
		return new Command(
			"create_imageset",
			new ObjectSchema(true)
				.withRequiredProperty('imageset', new ImageSetV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let imageset = args.get("imageset");
				this._logic.createImageSet(correlationId, imageset, callback);
			}
		);
	}

	private makeUpdateImageSetCommand(): ICommand {
		return new Command(
			"update_imageset",
			new ObjectSchema(true)
				.withRequiredProperty('imageset', new ImageSetV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let imageset = args.get("imageset");
				this._logic.updateImageSet(correlationId, imageset, callback);
			}
		);
	}

	private makeDeleteImageSetByIdCommand(): ICommand {
		return new Command(
			"delete_imageset_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('imageset_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let imagesetId = args.getAsNullableString("imageset_id");
				this._logic.deleteImageSetById(correlationId, imagesetId, callback);
			}
		);
	}

}