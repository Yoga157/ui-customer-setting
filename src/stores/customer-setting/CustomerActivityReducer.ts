import ICustomerState from "./models/ICustomerState";
import * as CustomerActions from "./CustomerActivityActions";
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CustomerSettingModel from "./models/CustomerSettingModel";
import CustomerSettingRow from "./models/CustomerSettingRow";
import ResultActions from "models/ResultActions";

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
      dataByCustomerId: action.payload!
    }
  },
  //   [FunnelActions.REQUEST_FUNNELS_OPPORTUNITY_SALES_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<FunnelOpportunityModel>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       data: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.REQUEST_SEARCH_OPP_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<FunnelOpportunityModel>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       data: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.REQUEST_SEARCH_MARKETING_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<FunnelOpportunityModel>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       data: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.REQUEST_CUSTOMERS_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<any>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       listCustomer: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.REQUEST_SALES_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<any>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       employee: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.POST_FUNNELS_OPPORTUNITY_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<ResultActions>
  //   ): any {
  //     return {
  //       ...state,
  //       error: action.error!,
  //       refreshPage: action.error ? false : true,
  //       resultActions: action.payload!,
  //     };
  //   },

  //   [FunnelActions.REQUEST_REASSIGN_SALES_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<ResultActions>
  //   ): any {
  //     return {
  //       ...state,
  //       error: action.error!,
  //       refreshPage: action.error ? false : true,
  //       resultActions: action.payload!,
  //     };
  //   },

  //   [FunnelActions.POST_UPLOAD_OPP_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<ResultActions>
  //   ): any {
  //     return {
  //       ...state,
  //       error: action.error!,
  //       refreshPage: action.error ? false : true,
  //       resultActions: action.payload!,
  //     };
  //   },

  //   [FunnelActions.PUT_FUNNELS_OPPORTUNITY_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<ResultActions>
  //   ): any {
  //     return {
  //       ...state,
  //       error: action.error!,
  //       refreshPage: action.error ? false : true,
  //       resultActions: action.payload!,
  //     };
  //   },

  //   [FunnelActions.REQUEST_OPPORTUNITY_BYID_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<FunnelOpportunityModel>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       dataById: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.CLEAR_RESULT_OPP_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<any>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       resultActions: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.REQUEST_DIREKTORAT_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<any>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       listDirektorat: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.REQUEST_DELETE_OPPORTUNITY_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<any>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       resultActions: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },

  //   [FunnelActions.REQUEST_CHECK_OPPORTUNITY_FINISHED](
  //     state: IFunnelState,
  //     action: IAction<any>
  //   ): IFunnelState {
  //     return {
  //       ...state,
  //       checkData: action.payload!,
  //       error: false,
  //       refreshPage: false,
  //     };
  //   },
});

export default customerSettingReducer;
