import ICustomerPICState from "./models/ICustomerPICState";
import * as CustomerPICAction from "./CustomerPICActions";
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CustomerPICModel from "./models/CustomerPICModel";
import ResultActions from "models/ResultActions";

export const initialState: ICustomerPICState = {
    data: [],
};

const CustomerPICReducer: Reducer = baseReducer(initialState, {
    [CustomerPICAction.REQUEST_GET_CUSTOMER_PIC_FINISHED](state: ICustomerPICState, action: IAction<CustomerPICModel[]>): ICustomerPICState {
        return {
            ...state,
            data: action.payload!
        }
    }
})

export default CustomerPICReducer