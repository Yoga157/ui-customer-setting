import * as CustomerNameEffect from "./CustomerNameActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerNameModel from "./models/CustomerNameModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerNameModel
  | ResultActions;

export const REQUEST_SEARCH_CUSTOMER_NAME: string = "CustomerNameAction.REQUEST_SEARCH_CUSTOMER_NAME";
export const REQUEST_SEARCH_CUSTOMER_NAME_FINISHED: string = "CustomerNameAction.REQUEST_SEARCH_CUSTOMER_NAME_FINISHED";

export const requestSearchCustomerName = (search: string): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<CustomerNameModel>(
            dispatch,
            REQUEST_SEARCH_CUSTOMER_NAME,
            CustomerNameEffect.requestSearchCustomerName,
            search
        )
    }
}