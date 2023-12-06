import CustomerSettingModel from "./CustomerSettingModel";
import CustomerSettingRow from "./CustomerSettingRow";

export default interface ICustomerState {
  readonly data: CustomerSettingModel;
  readonly activePage: number;
  readonly dataByCustomerId: CustomerSettingRow;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
