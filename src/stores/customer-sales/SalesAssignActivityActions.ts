import * as SalesAssignEffect from "./SalesAssignActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import SalesAssignModel from "./models/SalesAssignModel";
import SalesAssignRow from "./models/SalesAssignRow";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import SalesNameMode from "./models/SalesNameModel";
import SalesAssignPostModel from "./models/SalesAssignPostModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | SalesAssignModel
  | SalesAssignRow
  | SalesNameMode
  | ResultActions;

// //Get sales assign history by customer id
// export const REQUEST_SALES_ASSIGN: string = "SalesActions.REQUEST_SALES_ASSIGN";
// export const REQUEST_SALES_ASSIGN_FISNISHED: string =
//   "SalesActions.REQUEST_SALES_ASSIGN_FISNISHED";

// export const requestAssignSales = (
//   data: SalesAssignRow,
//   customerSettingId: number
// ): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ResultActions>(
//       dispatch,
//       REQUEST_SALES_ASSIGN,
//       SalesAssignEffect.requestAssignSales,
//       data,
//       customerSettingId
//     );
//   };
// };

//Get sales by Name
export const REQUEST_SALES_BY_NAME: string = "SalesAction.EQUEST_SALES_BY_NAME";
export const REQUEST_SALES_BY_NAME_FINISHED: string =
  "SalesAction.EQUEST_SALES_BY_NAME_FINISHED";

export const requestSalesByName = (search: string): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<SalesNameMode>(
      dispatch,
      REQUEST_SALES_BY_NAME,
      SalesAssignEffect.requestSalesByName,
      search
    );
  };
};

// Assign sales
export const POST_ASSIGN_SALES: string = "SalesActions.POST_CUSTOMERS_SALES";
export const POST_ASSIGN_SALES_FISNISHED: string =
  "SalesActions.POST_CUSTOMERS_SALES_FISNISHED";

export const postAssignedSales = (
  data: SalesAssignPostModel
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      POST_ASSIGN_SALES,
      SalesAssignEffect.postAssignedSales,
      data
    );
  };
};

// //Update assigned sales by customer id
// export const PUT_ASSIGN_SALES: string = "SalesActions.PUT_CUSTOMERS_SALES";
// export const PUT_ASSIGN_SALES_FISNISHED: string =
//   "SalesActions.PUT_CUSTOMERS_SALES_FISNISHED";

// export const putAssignedSales = (
//   data: SalesAssignRow,
//   UserLoginID: number,
//   id: number
// ): any => {
//   return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
//     await ActionUtility.createThunkEffect<ResultActions>(
//       dispatch,
//       POST_ASSIGN_SALES,
//       SalesAssignEffect.postAssignedSales,
//       data,
//       UserLoginID,
//       id
//     );
//   };
// };

export const CLEAR_RESULT_SALES: string = "SalesActions.CLEAR_RESULT_SALES";
export const CLEAR_RESULT_SALES_FINISHED: string =
  "SalesActions.CLEAR_RESULT_SALES_FINISHED";

export const clearResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      CLEAR_RESULT_SALES,
      SalesAssignEffect.clearResult
    );
  };
};
