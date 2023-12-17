import CustomerSettingById from "./CustomerSettingById";
import CustomerSettingModel from "./CustomerSettingModel";
import CustomerSettingRow from "./CustomerSettingRow";
import CustomerSettingID from "./CustomerSettingById";

export default interface ICustomerState {
  readonly data: CustomerSettingModel;
  readonly activePage: number;
  readonly dataByCustomerId: CustomerSettingById;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
