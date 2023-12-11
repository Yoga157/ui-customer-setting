import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class RelatedFileModel extends BaseModel {
    relatedFileID: number = 0;
    customerSettingID: number = 0;
    documentName: string = "";
    documentType: string = "";
    documentPath: string = "";
    createUserID: number = 0;
    createDate?: Date = undefined;
    modifyUserID: number = 0;
    modifyDate?: Date = undefined;

    constructor(data: Partial<RelatedFileModel>) {
        super();
        this.update(data);
    }
}