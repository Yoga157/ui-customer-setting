import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class RelatedCustomerPostModel extends BaseModel {
    relatedID: number = 0;
    customerSettingID: number = 0;
    relatedCustomerID: number = 0;
    createUserID: number = 0;
    createDate?: Date = undefined;
    modifyUserID: number = 0;
    modifyDate?: Date = undefined;

    constructor(data: Partial<RelatedCustomerPostModel>) {
        super();
        this.update(data);
    }
}