import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class SalesAssignPostModel extends BaseModel {
  // assignID: number = 0;
  // AssignedBy: string = "";
  // AssignStartDate?: Date = undefined;
  customerSettingID: number = 0;
  customerID: number = 0;
  salesID: number = 0;
  shareable: boolean = false;
  named: boolean = false;
  pmoCustomer: boolean = false;
  status: string = "";
  requestedBy: number = 0;
  requestedDate: Date = new Date();
  createDate?: Date = new Date();
  createUserID: number = 0;
  modifyDate?: Date = undefined;
  modifyUserID: number = 0;

  constructor(data: Partial<SalesAssignPostModel>) {
    super();
    this.update(data);
  }
  public update(data: Partial<SalesAssignPostModel>): void {
    const conversionOptions: IConversionOption = {
      // assignID: ConversionTypeEnum.Number,
      // AssignedBy: ConversionTypeEnum.String,
      customerSettingID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      shareable: ConversionTypeEnum.Boolean,
      named: ConversionTypeEnum.Boolean,
      pmoCustomer: ConversionTypeEnum.Boolean,
      status: ConversionTypeEnum.String,
      requestedBy: ConversionTypeEnum.Number,
      requestedDate: ConversionTypeEnum.String,
      createUserID: ConversionTypeEnum.Number,
      createDate: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
    };
    super.update(data, conversionOptions);
  }
}
