import {
    BaseModel,
    ConversionTypeEnum,
    IConversionOption,
  } from "sjs-base-model";
  
  export default class CustomerSettingById extends BaseModel {
    customerSettingID: number = 0;
    customerGenID: number = 0;
    customerCategoryID: string = "";
    customerName: string = "";
    shareable: boolean = false;
    pmoCustomer: boolean = false;
    blacklist: boolean = false;
    holdshipment: boolean = false;
    avgAR: number = 0;
    createUserID: string = "";
    createDate?: Date = undefined;
    modifyUserID: string = "";
    modifyDate?: Date = undefined;
  
    constructor(data: Partial<CustomerSettingById>) {
      super();
      this.update(data);
    }
  
    public update(data: Partial<CustomerSettingById>): void {
      const conversionOptions: IConversionOption = {
        customerSettingID: ConversionTypeEnum.Number,
        customerGenID: ConversionTypeEnum.Number,
        customerCategoryID: ConversionTypeEnum.String,
        shareable: ConversionTypeEnum.Boolean,
        pmoCustomer: ConversionTypeEnum.Boolean,
        blacklist: ConversionTypeEnum.Boolean,
        holdshipment: ConversionTypeEnum.Boolean,
        avgAR: ConversionTypeEnum.Number,
        createUserID: ConversionTypeEnum.String,
        modifyUserID: ConversionTypeEnum.String,
      };
  
      super.update(data, conversionOptions);
    }
  }
  