import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class InvoicingScheduleModel extends BaseModel {
    scheduleID: number = 0;
    customerSettingID: number = 0;
    scheduleDays: string = "";
    minDate: number = 0;
    maxDate: number = 0;
    remark: string = "";
    createUserID: number = 0;
    createDate?: Date = undefined;
    modifyUserID: number = 0;
    modifyDate?: Date = undefined;

    constructor(data: Partial<InvoicingScheduleModel>) {
        super();
        this.update(data);
    }
}