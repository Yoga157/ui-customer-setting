import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class RelatedCustomerModel extends BaseModel {
    relatedID: number = 0;
    customerGenID: number = 0;
    customerName: string = "";
    address: string = "";
    avgAR: number = 0;
    blacklist: boolean = false;
    holdshipment: boolean = false;

    constructor(data: Partial<RelatedCustomerModel>) {
        super();
        this.update(data);
    }
}