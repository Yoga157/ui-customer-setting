import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class SalesAssignPostModel extends BaseModel {
  assignID: number = 0;
  SalesID: number = 0;
  CustomerSettingID: number = 0;
  AssignStartDate?: Date = undefined;
  AssignedBy: number = 0;
  createDate?: Date = undefined;
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
      SalesID: ConversionTypeEnum.Number,
      CustomerSettingID: ConversionTypeEnum.Number,
      AssignedBy: ConversionTypeEnum.Number,
      createUserID: ConversionTypeEnum.Number,
      modifyUserID: ConversionTypeEnum.Number,
    };
    super.update(data, conversionOptions);
  }
}
