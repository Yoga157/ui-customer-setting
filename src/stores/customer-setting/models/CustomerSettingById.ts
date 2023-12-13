import {
  BaseModel,
  ConversionTypeEnum,
  IConversionOption,
} from "sjs-base-model";

export default class CustomerSettingById extends BaseModel {
  customerSettingID: number = 0;
  customerGenID: number = 0;
  customerCategoryID: string = "";
  shareable: boolean = false;
  pmoCustomer: boolean = false;
  createDate: string = "";
  createUserID: string = "";
  modifyDate?: Date = undefined;
  modifyUserID: string = "";

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
      createUserID: ConversionTypeEnum.String,
      createDate: ConversionTypeEnum.String,
      modifyUserID: ConversionTypeEnum.String,
    };

    super.update(data, conversionOptions);
  }
}
