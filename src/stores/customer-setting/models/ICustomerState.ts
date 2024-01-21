import CustomerSettingById from "./CustomerSettingById";
import CustomerSettingModel from "./CustomerSettingModel";
import CustomerSettingPostModel from "./CustomerSettingPostModel";

export default interface ICustomerState {
  readonly data: CustomerSettingModel;
  readonly dataNoName: CustomerSettingModel;
  readonly dataNamed: CustomerSettingModel;
  readonly dataShareable: CustomerSettingModel;
  readonly CustomerSettingPostModel: CustomerSettingPostModel;
  readonly dataAll: CustomerSettingModel;
  readonly activePage: number;
  readonly dataByCustomerId: CustomerSettingById;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
