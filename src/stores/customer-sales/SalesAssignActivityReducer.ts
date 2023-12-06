import ISalesAssignState from "./models/ISalesAssignState";
import * as SalesActions from "./SalesAssignActivityActions";
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import SalesAssignModel from "./models/SalesAssignModel";
import SalesNameModel from "./models/SalesNameModel";
import SalesAssignRow from "./models/SalesAssignRow";
import ResultActions from "models/ResultActions";

import SalesAssignPostModel from "./models/SalesAssignPostModel";

export const initialState: ISalesAssignState = {
  sales: [],
  data: new SalesAssignModel({}),
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  salesExstingModel: new SalesNameModel({}),
  SalesAssignPostModel: new SalesAssignPostModel({}),
};

const SalesAssignReducer: Reducer = baseReducer(initialState, {
  [SalesActions.REQUEST_SALES_BY_NAME_FINISHED](
    state: ISalesAssignState,
    action: IAction<SalesNameModel[]>
  ): ISalesAssignState {
    return {
      ...state,
      sales: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [SalesActions.REQUEST_SALES_LIST_FINISHED](
    state: ISalesAssignState,
    action: IAction<SalesNameModel[]>
  ): ISalesAssignState {
    return {
      ...state,
      sales: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [SalesActions.POST_ASSIGN_SALES_FISNISHED](
    state: ISalesAssignState,
    action: IAction<ResultActions>
  ): any {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [SalesActions.CLEAR_RESULT_SALES_FINISHED](
    state: ISalesAssignState,
    action: IAction<any>
  ): ISalesAssignState {
    return {
      ...state,
      resultActions: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
});

export default SalesAssignReducer;
