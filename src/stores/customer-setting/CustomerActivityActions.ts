import * as CustomerEffect from "./CustomerActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerSettingModel from "./models/CustomerSettingModel";
import CustomerSettingRow from "./models/CustomerSettingRow";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";
import CustomerSettingById from "./models/CustomerSettingById";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerSettingModel
  | CustomerSettingRow
  | CustomerSettingById
  | boolean
  | ResultActions;

export const REQUEST_CUSTOMERS_SETTING: string =
  "CustomerActions.REQUEST_CUSTOMERS_SETTING";
export const REQUEST_CUSTOMERS_SETTING_FINISHED: string =
  "CustomerActions.REQUEST_CUSTOMERS_SETTING_FINISHED";

export const requestCustomerSett = (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_CUSTOMERS_SETTING,
      CustomerEffect.requestCustomerSett,
      page,
      pageSize,
      column,
      sorting
    );
  };
};

export const REQUEST_CUSTOMERS_SETTING_SEARCH: string =
  "CustomerActions.REQUEST_CUSTOMERS_SETTING_SEARCH";
export const REQUEST_CUSTOMERS_SETTING_SEARCH_FINISHED: string =
  "CustomerActions.REQUEST_CUSTOMERS_SETTING_SEARCH_FINISHED";

export const requestSearchCustomerSett = (
  page: number,
  pageSize: number,
  column: string,
  search: string,
  sorting?: string,
  salesAssign?: string,
  shareable?: boolean,
  pmo_customer?: boolean,
  holdshipment?: boolean,
  blacklist?: boolean
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_CUSTOMERS_SETTING_SEARCH,
      CustomerEffect.requestSearchCustomerSett,
      page,
      pageSize,
      column,
      search,
      sorting,
      salesAssign,
      shareable,
      pmo_customer,
      holdshipment,
      blacklist
    );
  };
};

export const SET_PAGE: string = "CustomerActions.SET_PAGE";
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};

export const REQUEST_RESET_FILTER: string =
  "CustomerActions.REQUEST_RESET_FILTER";
export const requestResetFilter = (): IAction<boolean> => {
  return ActionUtility.createAction(REQUEST_RESET_FILTER, true);
};

export const DEL_CUSTOMERS_SETTING: string =
  "CustomerActions.DEL_CUSTOMERS_SETTING";
export const DEL_CUSTOMERS_SETTING_FINISHED =
  "CustomerActions.DEL_CUSTOMERS_SETTING_FINISHED";
export const deleteCustomerSett = (customerSettingID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      DEL_CUSTOMERS_SETTING,
      CustomerEffect.deleteCustomerSett,
      customerSettingID
    );
  };
};

export const REQUEST_CUSTOMER_SETTING_BY_CUSTOMER_ID: string =
  "CustomerActions.REQUEST_CUSTOMER_SETTING_BY_CUSTOMER_ID";
export const REQUEST_CUSTOMER_SETTING_BY_CUSTOMER_ID_FINISHED =
  "CustomerActions.REQUEST_CUSTOMER_SETTING_BY_CUSTOMER_ID_FINISHED";

export const requestCustomerSettingByCustomerId = (customerId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingById>(
      dispatch,
      REQUEST_CUSTOMER_SETTING_BY_CUSTOMER_ID,
      CustomerEffect.requestCustomerSettingByCustomerId,
      customerId
    );
  };
};

export const REQUEST_CUSTOMER_SETTING_BY_ID: string =
  "CustomerActions.REQUEST_CUSTOMER_SETTING_BY_ID";
export const REQUEST_CUSTOMER_SETTING_BY_ID_FINISHED =
  "CustomerActions.REQUEST_CUSTOMER_SETTING_BY_ID_FINISHED";
export const requestCustomerSettingById = (customerSettingId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingById>(
      dispatch,
      REQUEST_CUSTOMER_SETTING_BY_ID,
      CustomerEffect.requestCustomerSettingById,
      customerSettingId
    );
  };
};

export const POST_CUSTOMER_SETTING: string =
  "CustomerActions.POST_CUSTOMER_SETTING";
export const POST_CUSTOMER_SETTING_FINISHED =
  "CustomerActions.POST_CUSTOMER_SETTING_FINISHED";
export const postCustomerSetting = (data: CustomerSettingById): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_CUSTOMER_SETTING,
      CustomerEffect.postCustomerSetting,
      data
    );
  };
};

export const PUT_CUSTOMER_SETTING: string =
  "CustomerActions.PUT_CUSTOMER_SETTING";
export const PUT_CUSTOMER_SETTING_FINISHED =
  "CustomerActions.PUT_CUSTOMER_SETTING_FINISHED";
export const putCustomerSetting = (data: CustomerSettingById, id: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      PUT_CUSTOMER_SETTING,
      CustomerEffect.putCustomerSetting,
      data,
      id
    );
  };
};

export const CLEAR_CUSTOMER_SETTING: string =
  "CustomerActions.CLEAR_CUSTOMER_SETTING";
export const CLEAR_CUSTOMER_SETTING_FINISHED: string =
  "CustomerActions.CLEAR_CUSTOMER_SETTING_FINISHED";

export const clearResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      CLEAR_CUSTOMER_SETTING,
      CustomerEffect.clearResult
    );
  };
};
