import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerSettingRow extends BaseModel {
  customerSettingID: number = 0;
  customerID: number = 0;
  salesID: number = 0;
  customerCategory: string = "";
  customerName: string = "";
  customerAddress: string = "";
  lastProjectName: string = "";
  salesName: string = "";
  relatedCustomer: string = "";
  invoiceCondition: string = "";
  shareable: boolean = false;
  pmoCustomer: boolean = false;
  blacklist: boolean = false;
  named: boolean = false;
  holdshipment: boolean = false;
  createdBy: string = "";
  createdDate?: Date = undefined;
  modifiedBy: string = "";
  modifiedDate?: Date = undefined;

  constructor(data: Partial<CustomerSettingRow>) {
    super();
    this.update(data);
  }

  public update(data: Partial<CustomerSettingRow>): void {
    const conversionOptions: IConversionOption = {
      customerSettingID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      customerCategory: ConversionTypeEnum.String,
      customerName: ConversionTypeEnum.String,
      customerAddress: ConversionTypeEnum.String,
      lastProjectName: ConversionTypeEnum.String,
      salesName: ConversionTypeEnum.String,
      relatedCustomer: ConversionTypeEnum.String,
      invoiceCondition: ConversionTypeEnum.String,
      shareable: ConversionTypeEnum.Boolean,
      pmoCustomer: ConversionTypeEnum.Boolean,
      blacklist: ConversionTypeEnum.Boolean,
      named: ConversionTypeEnum.Boolean,
      holdshipment: ConversionTypeEnum.Boolean,
      createdBy: ConversionTypeEnum.String,
      modifiedBy: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
