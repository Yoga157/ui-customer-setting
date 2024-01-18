import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";
  
export default class CustomerClaimAccount extends BaseModel {
    customerSettingID: number = 0;
    customerID: number = 0;
    customerCategory: string = "";
    salesID: number = 0;
    shareable: boolean = false;
    named: boolean = false;
    pmoCustomer: boolean = false;
    status: string = "approve";
    requestedBy: number = 0;
    requestedDate: Date = new Date();
    createUserID: number = 0;
    createDate?: Date = new Date();
    modifyUserID: number = 0;
    modifyDate?: Date = new Date();

    constructor(data: Partial<CustomerClaimAccount>) {
        super();
        this.update(data);
    }

    public update(data: Partial<CustomerClaimAccount>): void {
        const conversionOptions: IConversionOption = {
                customerSettingID: ConversionTypeEnum.Number,
                customerID: ConversionTypeEnum.Number,
                salesID: ConversionTypeEnum.Number,
                shareable: ConversionTypeEnum.Boolean,
                named: ConversionTypeEnum.Boolean,
                pmoCustomer: ConversionTypeEnum.Boolean,
                status: ConversionTypeEnum.String,
                requestedBy: ConversionTypeEnum.Number,
                createUserID: ConversionTypeEnum.String,
                modifyUserID: ConversionTypeEnum.String,
        };

        super.update(data, conversionOptions);
    }
}