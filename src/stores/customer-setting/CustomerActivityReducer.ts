import ICustomerState from "./models/ICustomerState";
import * as CustomerActions from "./CustomerActivityActions";
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CustomerSettingModel from "./models/CustomerSettingModel";
import CustomerSettingRow from "./models/CustomerSettingRow";
import ResultActions from "models/ResultActions";
import CustomerSettingById from "./models/CustomerSettingById";

export const initialState: ICustomerState = {
  data: new CustomerSettingModel({}),
  dataByCustomerId: new CustomerSettingRow({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  activePage: 1,
};

const customerSettingReducer: Reducer = baseReducer(initialState, {
  [CustomerActions.REQUEST_CUSTOMERS_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    // console.log("Received data from API:", action.payload);
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.REQUEST_CUSTOMERS_SETTING_SEARCH_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [CustomerActions.SET_PAGE](
    state: ICustomerState,
    action: IAction<number>
  ): ICustomerState {
    return {
      ...state,
      activePage: action.payload!,
    };
  },

  [CustomerActions.DEL_CUSTOMERS_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingModel>
  ): ICustomerState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [CustomerActions.REQUEST_CUSTOMER_SETTING_BY_CUSTOMER_ID_FINISHED](
    state: ICustomerState,
    action: IAction<CustomerSettingRow>
  ): ICustomerState {
    return {
      ...state,
      dataByCustomerId: action.payload!,
    };
  },

  [CustomerActions.REQUEST_RESET_FILTER](
    state: ICustomerState,
    action: IAction<boolean>
  ): ICustomerState {
    return initialState;
  },

  [CustomerActions.PUT_CUSTOMER_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CustomerActions.CLEAR_CUSTOMER_SETTING_FINISHED](
    state: ICustomerState,
    action: IAction<any>
  ): ICustomerState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
});

export default customerSettingReducer;
