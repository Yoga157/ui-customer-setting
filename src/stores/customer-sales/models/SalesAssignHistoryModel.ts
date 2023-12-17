import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class SalesAssignHistoryModel extends BaseModel {
    assignID: number = 0;
    customerSettingID: number = 0;
    salesID: number = 0;
    salesName: string = "";
    customerName: string = "";
    yearAssign: string = "";

    constructor(data: Partial<SalesAssignHistoryModel>) {
        super();
        this.update(data);
    }
}
  