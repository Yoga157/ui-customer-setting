import ICustomerNameState from "./models/ICustomerNameState";
import * as CustomerNameAction from "./CustomerNameActivityActions"
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CustomerNameModel from "./models/CustomerNameModel";
import ResultActions from "models/ResultActions";

export const initialState: ICustomerNameState = {
    data: [],
};

const CustomerNameReducer: Reducer = baseReducer(initialState, {
    [CustomerNameAction.REQUEST_SEARCH_CUSTOMER_NAME_FINISHED](state: ICustomerNameState, action: IAction<CustomerNameModel[]>): ICustomerNameState {
        return {
            ...state,
            data: action.payload!
        }
    }
})

export default CustomerNameReducer