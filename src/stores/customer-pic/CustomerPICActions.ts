import * as CustomerPICEffects from "./CustomerPICActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import CustomerPICModel from "./models/CustomerPICModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerPICModel
  | ResultActions;

export const REQUEST_GET_CUSTOMER_PIC: string = "CustomerNameAction.REQUEST_GET_CUSTOMER_PIC";
export const REQUEST_GET_CUSTOMER_PIC_FINISHED: string = "CustomerNameAction.REQUEST_GET_CUSTOMER_PIC_FINISHED";

export const requestGetCustomerPIC = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<CustomerPICModel>(
            dispatch,
            REQUEST_GET_CUSTOMER_PIC,
            CustomerPICEffects.requestGetCustomerPIC,
            customerID
        )
    }
}