import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerSettingRow extends BaseModel {
  customerSettingID: number = 0;
  customerID: number = 0;
  customerCategory: string = "";
  customerName: string = "";
  lastProjectName: string = "";
  salesAssign: boolean = false;
  relatedCustomer: string = "";
  invoiceCondition: string = "";
  shareable: boolean = false;
  pmoCustomer: boolean = false;
  blacklist: boolean = false;
  holdshipment: boolean = false;
  createUserID: string = "";
  createDate?: Date = undefined;
  modifyUserID: string = "";
  modifyDate?: Date = undefined;

  constructor(data: Partial<CustomerSettingRow>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CustomerSettingRow>): void {
    const conversionOptions: IConversionOption = {
      customerSettingID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
      customerCategory: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      lastProjectName: ConversionTypeEnum.String,
      salesAssign: ConversionTypeEnum.Boolean,
      relatedCustomer: ConversionTypeEnum.String,
      invoiceCondition: ConversionTypeEnum.String,
      shareable: ConversionTypeEnum.Boolean,
      pmoCustomer: ConversionTypeEnum.Boolean,
      blacklist: ConversionTypeEnum.Boolean,
      holdshipment: ConversionTypeEnum.Boolean,
      createUserID: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
