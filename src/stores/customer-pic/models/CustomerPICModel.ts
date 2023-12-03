import { BaseModel, ConversionTypeEnum, IConversionOption } from "sjs-base-model";

export default class CustomerPICModel extends BaseModel {
    
    constructor(data: Partial<CustomerPICModel>) {
        super();
        this.update(data);
    }

    public update(data: Partial<CustomerPICModel>): void {
        const conversionOptions: IConversionOption = {
        }

        super.update(data, conversionOptions);
    }
}