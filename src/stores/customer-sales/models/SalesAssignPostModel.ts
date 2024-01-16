import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class SalesAssignPostModel extends BaseModel {
  assignID: number = 0;
  salesID: number = 0;
  customerID: number = 0;
  customerSettingID: number = 0;
  AssignStartDate?: Date = undefined;
  AssignedBy: string = "";
  named: boolean = false;
  shareable: boolean = false;
  pmoCustomer: boolean = false;
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
      assignID: ConversionTypeEnum.Number,
      salesID: ConversionTypeEnum.Number,
      customerID: ConversionTypeEnum.Number,
      customerSettingID: ConversionTypeEnum.Number,
      AssignedBy: ConversionTypeEnum.String,
      named: ConversionTypeEnum.Boolean,
      createUserID: ConversionTypeEnum.Number,
      createDate: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.Number,
    };
    super.update(data, conversionOptions);
  }
}
