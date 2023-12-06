import IInvoicingScheduleState from "./models/IInvoicingScheduleState";
import * as InvoicingScheduleActions from "./InvoicingScheduleActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import InvoicingScheduleModel from "./models/InvoicingScheduleModel";

export const initialState: IInvoicingScheduleState = {
    data: new InvoicingScheduleModel({})
}

const InvoicingScheduleReducer: Reducer = baseReducer(initialState, {
    [InvoicingScheduleActions.POST_INVOICING_SCHEDULE_FISNISHED](state: IInvoicingScheduleState, action: IAction<InvoicingScheduleModel>): IInvoicingScheduleState {
        return {
            ...state,
            data: action.payload!
        }
    },
})

export default InvoicingScheduleReducer;