import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class CustomerNameModel extends BaseModel {
    customerGenID: number = 0;
    customerID: number = 0;
    customerName: string = "";
    addr1: string = "";
    addr2: string = "";
    addr3: string = "";
    addr4: string = "";
    city: string = "";
    industryClass: string = "";
    endUserFlag: string = "";
    creator: string = "";
    lastModifyUser: number = 0;
    lastModifyDate: Date = undefined;
    customerIDC: number = 0;
    npwpNumber: string = "";
    
    constructor(data: Partial<CustomerNameModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<CustomerNameModel>): void {
        const conversionOptions: IConversionOption = {
            customerGenID: ConversionTypeEnum.Number,
            customerID: ConversionTypeEnum.Number,
            customerName: ConversionTypeEnum.String,
            addr1: ConversionTypeEnum.String,
            addr2: ConversionTypeEnum.String,
            addr3: ConversionTypeEnum.String,
            addr4: ConversionTypeEnum.String,
            city: ConversionTypeEnum.String,
            industryClass: ConversionTypeEnum.String,
            endUserFlag: ConversionTypeEnum.String,
            creator: ConversionTypeEnum.String,
            lastModifyUser: ConversionTypeEnum.Number,
            customerIDC: ConversionTypeEnum.Number,
            npwpNumber: ConversionTypeEnum.String,
        }

        super.update(data, conversionOptions);
    }
}