import CustomerSettingModel from "./CustomerSettingModel";

export default interface ICustomerState {
  readonly data: CustomerSettingModel;
  readonly activePage: number;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
