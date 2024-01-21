import * as CustomerEffect from "./CustomerActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerSettingModel from "./models/CustomerSettingModel";
import CustomerSettingRow from "./models/CustomerSettingRow";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";
import CustomerSettingById from "./models/CustomerSettingById";
import CustomerClaimAccount from "./models/CustomerClaimAccount";

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

export const REQUEST_NO_NAME_ACCOUNTS: string =
  "CustomerActions.REQUEST_NO_NAME_ACCOUNTS";
export const REQUEST_NO_NAME_ACCOUNTS_FINISHED: string =
  "CustomerActions.REQUEST_NO_NAME_ACCOUNTS_FINISHED";

export const requestNoNameAcc = (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_NO_NAME_ACCOUNTS,
      CustomerEffect.requestNoNameAcc,
      page,
      pageSize,
      column,
      sorting
    );
  };
};

export const REQUEST_NAMED_ACCOUNTS: string =
  "CustomerActions.REQUEST_NAMED_ACCOUNTS";
export const REQUEST_NAMED_ACCOUNTS_FINISHED: string =
  "CustomerActions.REQUEST_NAMED_ACCOUNTS_FINISHED";

export const requestNamedAcc = (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_NAMED_ACCOUNTS,
      CustomerEffect.requestNamedAcc,
      page,
      pageSize,
      column,
      sorting
    );
  };
};

export const REQUEST_SHAREABLE_ACCOUNTS: string =
  "CustomerActions.REQUEST_SHAREABLE_ACCOUNTS";
export const REQUEST_SHAREABLE_ACCOUNTS_FINISHED: string =
  "CustomerActions.REQUEST_SHAREABLE_ACCOUNTS_FINISHED";

export const requestShareabledAcc = (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_SHAREABLE_ACCOUNTS,
      CustomerEffect.requestShareabledAcc,
      page,
      pageSize,
      column,
      sorting
    );
  };
};

export const REQUEST_ALL_ACCOUNTS: string =
  "CustomerActions.REQUEST_ALL_ACCOUNTS";
export const REQUEST_ALL_ACCOUNTS_FINISHED: string =
  "CustomerActions.REQUEST_ALL_ACCOUNTS_FINISHED";

export const requestAllAcc = (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_ALL_ACCOUNTS,
      CustomerEffect.requestAllAcc,
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

export const REQUEST_NO_NAME_SEARCH: string =
  "CustomerActions.REQUEST_NO_NAME_SEARCH";
export const REQUEST_NO_NAME_SEARCH_FINISHED: string =
  "CustomerActions.REQUEST_NO_NAME_SEARCH_FINISHED";

export const requestSearchNoNameAcc = (
  page: number,
  pageSize: number,
  column: string,
  search: string,
  sorting?: string,
  shareable?: boolean,
  pmo_customer?: boolean,
  holdshipment?: boolean,
  blacklist?: boolean
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_NO_NAME_SEARCH,
      CustomerEffect.requestSearchNoNameAcc,
      page,
      pageSize,
      column,
      search,
      sorting,
      shareable,
      pmo_customer,
      holdshipment,
      blacklist
    );
  };
};

export const REQUEST_NAMED_SEARCH: string =
  "CustomerActions.REQUEST_NAMED_SEARCH";
export const REQUEST_NAMED_SEARCH_FINISHED: string =
  "CustomerActions.REQUEST_NAMED_SEARCH_FINISHED";

export const requestSearchNamedAcc = (
  page: number,
  pageSize: number,
  column: string,
  search: string,
  sorting?: string,
  shareable?: boolean,
  pmo_customer?: boolean,
  holdshipment?: boolean,
  blacklist?: boolean
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_NAMED_SEARCH,
      CustomerEffect.requestSearchNamedAcc,
      page,
      pageSize,
      column,
      search,
      sorting,
      shareable,
      pmo_customer,
      holdshipment,
      blacklist
    );
  };
};

export const REQUEST_SHAREABLE_SEARCH: string =
  "CustomerActions.REQUEST_SHAREABLE_SEARCH";
export const REQUEST_SHAREABLE_SEARCH_FINISHED: string =
  "CustomerActions.REQUEST_SHAREABLE_SEARCH_FINISHED";

export const requestSearchShareabelAcc = (
  page: number,
  pageSize: number,
  column: string,
  search: string,
  sorting?: string,
  shareable?: boolean,
  pmo_customer?: boolean,
  holdshipment?: boolean,
  blacklist?: boolean
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_SHAREABLE_SEARCH,
      CustomerEffect.requestSearchShareabelAcc,
      page,
      pageSize,
      column,
      search,
      sorting,
      shareable,
      pmo_customer,
      holdshipment,
      blacklist
    );
  };
};

export const REQUEST_ALL_SEARCH: string = "CustomerActions.REQUEST_ALL_SEARCH";
export const REQUEST_ALL_SEARCH_FINISHED: string =
  "CustomerActions.REQUEST_ALL_SEARCH_FINISHED";

export const requestSearchAllAcc = (
  page: number,
  pageSize: number,
  column: string,
  search: string,
  sorting?: string,
  shareable?: boolean,
  pmo_customer?: boolean,
  holdshipment?: boolean,
  blacklist?: boolean
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerSettingModel>(
      dispatch,
      REQUEST_ALL_SEARCH,
      CustomerEffect.requestSearchAllAcc,
      page,
      pageSize,
      column,
      search,
      sorting,
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
export const putCustomerSetting = (
  data: CustomerSettingById,
  id: number
): any => {
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

export const POST_CLAIM_ACCOUNT: string =
  "CustomerActions.POST_CLAIM_ACCOUNT";
export const POST_CLAIM_ACCOUNT_FINISHED =
  "CustomerActions.POST_CLAIM_ACCOUNT_FINISHED";
export const claimAccount = (data: CustomerClaimAccount): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_CUSTOMER_SETTING,
      CustomerEffect.claimAccount,
      data
    );
  };
};

export const REQUEST_CUSTOMER_DATA_BY_CUSTOMER_ID: string =
  "CustomerActions.REQUEST_CUSTOMER_DATA_BY_CUSTOMER_ID";
export const REQUEST_CUSTOMER_DATA_BY_CUSTOMER_ID_FINISHED =
  "CustomerActions.REQUEST_CUSTOMER_DATA_BY_CUSTOMER_ID_FINISHED";
export const requestCustomerDataById = (customerId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_CUSTOMER_DATA_BY_CUSTOMER_ID,
      CustomerEffect.requestCustomerDataById,
      customerId
    );
  };
};

export const PUT_RELEASE_ACCOUNT: string =
  "CustomerActions.PUT_RELEASE_ACCOUNT";
export const PUT_RELEASE_ACCOUNT_FINISHED =
  "CustomerActions.PUT_RELEASE_ACCOUNT_FINISHED";
export const releaseAccount = (customerID: number, salesID: number, modifyUserID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_CUSTOMER_SETTING,
      CustomerEffect.releaseAccount,
      customerID,
      salesID,
      modifyUserID
    );
  };
};

export const PUT_ACCEPT_REQUEST_SHAREABLE: string =
  "CustomerActions.PUT_ACCEPT_REQUEST_SHAREABLE";
export const PUT_ACCEPT_REQUEST_SHAREABLE_FINISHED =
  "CustomerActions.PUT_ACCEPT_REQUEST_SHAREABLE_FINISHED";
export const acceptRequestShareableAccount = (customerID: number, salesID: number, modifyUserID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_CUSTOMER_SETTING,
      CustomerEffect.acceptRequestShareableAccount,
      customerID,
      salesID,
      modifyUserID
    );
  };
};