import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class InvoicingConditionModel extends BaseModel {
    conditionID: number = 0;
    customerSettingID: number = 0;
    projectType: string = "";
    conditionName: string = "";
    createUserID: number = 0;
    createDate?: Date = undefined;
    modifyUserID: number = 0;
    modifyDate?: Date = undefined;

    constructor(data: Partial<InvoicingConditionModel>) {
        super();
        this.update(data);
    }
}