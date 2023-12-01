import * as CustomerEffect from "./CustomerActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerSettingModel from "./models/CustomerSettingModel";
import CustomerSettingRow from "./models/CustomerSettingRow";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerSettingModel
  | CustomerSettingRow
  | ResultActions;

export const REQUEST_CUSTOMERS_SETTING: string =
  "CustomerActions.REQUEST_CUSTOMERS_SETTING";
export const REQUEST_CUSTOMERS_SETTING_FINISHED: string =
  "CustomerActions.REQUEST_CUSTOMERS_SETTING_FINISHED";

export const requestCustomerSett = (
  page: number,
  pageSize: number,
  column: string,
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

// export const REQUEST_FUNNELS_OPPORTUNITY_SALES: string =
//   "FunnelActions.REQUEST_FUNNELS_OPPORTUNITY_SALES";
// export const REQUEST_FUNNELS_OPPORTUNITY_SALES_FINISHED: string =
//   "FunnelActions.REQUEST_FUNNELS_OPPORTUNITY_SALES_FINISHED";

// export const requestFunnelSales = (
//   page: number,
//   pageSize: number,
//   UserLoginID: number
// ): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<FunnelOpportunityModel>(
//       dispatch,
//       REQUEST_FUNNELS_OPPORTUNITY_SALES,
//       FunnelEffect.requestFunnelSales,
//       page,
//       pageSize,
//       UserLoginID
//     );
//   };
// };

// export const POST_FUNNELS_OPPORTUNITY: string =
//   "FunnelActions.POST_FUNNELS_OPPORTUNITY";
// export const POST_FUNNELS_OPPORTUNITY_FINISHED: string =
//   "FunnelActions.POST_FUNNELS_OPPORTUNITY_FINISHED";

// export const postFunnelOpp = (data): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ResultActions>(
//       dispatch,
//       POST_FUNNELS_OPPORTUNITY,
//       FunnelEffect.postFunnelOpp,
//       data
//     );
//   };
// };

// export const PUT_FUNNELS_OPPORTUNITY: string =
//   "FunnelActions.PUT_FUNNELS_OPPORTUNITY";
// export const PUT_FUNNELS_OPPORTUNITY_FINISHED: string =
//   "FunnelActions.PUT_FUNNELS_OPPORTUNITY_FINISHED";

// export const putFunnelOpp = (data): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ResultActions>(
//       dispatch,
//       PUT_FUNNELS_OPPORTUNITY,
//       FunnelEffect.putFunnelOpp,
//       data
//     );
//   };
// };

// export const REQUEST_CUSTOMERS: string = "FunnelActions.REQUEST_CUSTOMERS";
// export const REQUEST_CUSTOMERS_FINISHED: string =
//   "FunnelActions.REQUEST_CUSTOMERS_FINISHED";

// export const requestCustomers = (custName: string): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<CustomerModel>(
//       dispatch,
//       REQUEST_CUSTOMERS,
//       FunnelEffect.requestCustomers,
//       custName
//     );
//   };
// };

// export const REQUEST_SALES: string = "FunnelActions.REQUEST_SALES";
// export const REQUEST_SALES_FINISHED: string =
//   "FunnelActions.REQUEST_SALES_FINISHED";

// export const requestSales = (custName: string, direktoratID: number): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<EmployeeModel>(
//       dispatch,
//       REQUEST_SALES,
//       FunnelEffect.requestSales,
//       custName,
//       direktoratID
//     );
//   };
// };

// export const POST_UPLOAD_OPP: string = "FunnelActions.POST_UPLOAD_OPP";
// export const POST_UPLOAD_OPP_FINISHED =
//   "FunnelActions.POST_UPLOAD_OPP_FINISHED";
// export const postFileOpp = (data: any): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ResultActions>(
//       dispatch,
//       POST_UPLOAD_OPP,
//       FunnelEffect.postFileOpp,
//       data
//     );
//   };
// };

// export const REQUEST_SEARCH_OPP: string = "FunnelActions.REQUEST_SEARCH_OPP";
// export const REQUEST_SEARCH_OPP_FINISHED =
//   "FunnelActions.REQUEST_SEARCH_OPP_FINISHED";

// export const requestSearchOpp = (
//   page: number,
//   pageSize: number,
//   UserLoginID: number,
//   search: string
// ): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<FunnelOpportunityModel>(
//       dispatch,
//       REQUEST_SEARCH_OPP,
//       FunnelEffect.requestSearchOpp,
//       page,
//       pageSize,
//       UserLoginID,
//       search
//     );
//   };
// };

// export const REQUEST_SEARCH_MARKETING: string =
//   "FunnelActions.REQUEST_SEARCH_MARKETING";
// export const REQUEST_SEARCH_MARKETING_FINISHED =
//   "FunnelActions.REQUEST_SEARCH_MARKETING_FINISHED";

// export const requestSearchMarketing = (
//   page: number,
//   pageSize: number,
//   search: string
// ): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<FunnelOpportunityModel>(
//       dispatch,
//       REQUEST_SEARCH_MARKETING,
//       FunnelEffect.requestSearchMarketing,
//       page,
//       pageSize,
//       search
//     );
//   };
// };

// export const REQUEST_OPPORTUNITY_BYID: string =
//   "FunnelActions.REQUEST_OPPORTUNITY_BYID";
// export const REQUEST_OPPORTUNITY_BYID_FINISHED =
//   "FunnelActions.REQUEST_OPPORTUNITY_BYID_FINISHED";

// export const requestOpportunityByID = (funnelOpportunityID: number): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<FunnelOpportunityRow>(
//       dispatch,
//       REQUEST_OPPORTUNITY_BYID,
//       FunnelEffect.requestOpportunityByID,
//       funnelOpportunityID
//     );
//   };
// };

// export const REQUEST_REASSIGN_SALES: string =
//   "FunnelActions.REQUEST_REASSIGN_SALES";
// export const REQUEST_REASSIGN_SALES_FINISHED =
//   "FunnelActions.REQUEST_REASSIGN_SALES_FINISHED";

// export const requestReassignSales = (data: ReassignModel): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ReassignModel>(
//       dispatch,
//       REQUEST_REASSIGN_SALES,
//       FunnelEffect.requestReassignSales,
//       data
//     );
//   };
// };

// export const CLEAR_RESULT_OPP: string = "FunnelActions.CLEAR_RESULT_OPP";
// export const CLEAR_RESULT_OPP_FINISHED: string =
//   "FunnelActions.CLEAR_RESULT_OPP_FINISHED";

// export const clearResult = (): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ResultActions>(
//       dispatch,
//       CLEAR_RESULT_OPP,
//       FunnelEffect.clearResult
//     );
//   };
// };

// export const REQUEST_DIREKTORAT: string = "FunnelActions.REQUEST_DIREKTORAT";
// export const REQUEST_DIREKTORAT_FINISHED =
//   "FunnelActions.REQUEST_DIREKTORAT_FINISHED";

// export const requestDirektorat = (): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<EmployeeModel>(
//       dispatch,
//       REQUEST_DIREKTORAT,
//       FunnelEffect.requestDirektorat
//     );
//   };
// };

// export const REQUEST_DELETE_OPPORTUNITY: string =
//   "FunnelActions.REQUEST_DELETE_OPPORTUNITY";
// export const REQUEST_DELETE_OPPORTUNITY_FINISHED =
//   "FunnelActions.REQUEST_DELETE_OPPORTUNITY_FINISHED";

// export const requestCancelOpp = (oppId: number): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ResultActions>(
//       dispatch,
//       REQUEST_DELETE_OPPORTUNITY,
//       FunnelEffect.requestCancelOpp,
//       oppId
//     );
//   };
// };

// export const REQUEST_CHECK_OPPORTUNITY: string =
//   "FunnelActions.REQUEST_CHECK_OPPORTUNITY";
// export const REQUEST_CHECK_OPPORTUNITY_FINISHED =
//   "FunnelActions.REQUEST_CHECK_OPPORTUNITY_FINISHED";

// export const checkToFunnelOpportunity = (data: any): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ResultActions>(
//       dispatch,
//       REQUEST_CHECK_OPPORTUNITY,
//       FunnelEffect.checkToFunnelOpportunity,
//       data
//     );
//   };
// };
