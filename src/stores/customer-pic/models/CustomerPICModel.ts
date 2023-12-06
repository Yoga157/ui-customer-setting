import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class CustomerPICModel extends BaseModel {
    picName: string = "";
    picTitle: string = "";
    phone: string = "";
    email: string = "";
    latestProject: string = "";

    constructor(data: Partial<CustomerPICModel>) {
        super();
        this.update(data);
    }
}